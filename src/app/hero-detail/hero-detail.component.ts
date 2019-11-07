import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  //used for angular testing custom async tests
  save(): void {
    // Promises are always asynchronous, this will help us simulate a situation where we are relying on a third party 
    // for http request which relies on promises
    var p = new Promise(resolve => { 
          this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
      resolve(); 
    })
  }
// Used for setTimout & fakeAsync tests
//  save(): void {
//    // This is to simulate asychronicity using setTimeout
//    this.debounce(() => {
//     this.heroService.updateHero(this.hero)
//       .subscribe(() => this.goBack());
//    }, 250, false)(); 
//   }

  // Helps ensure that a function doesnt get called too often
  debounce(func, wait, immediate) {
    var timeout;
    return function(){
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if(!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if(callNow) func.apply(context, args);
    }
  }
}
