import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { NO_ERRORS_SCHEMA, Input, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { Hero } from '../hero';

describe('HeroesComponent (Shallow Test)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;
    // Using schemas: [NO_ERRORS_SCHEMA] in our TestBed configuration disables all template errors
    // We do not desire this behaviour always, also when writing shallow unit tests for a component
    // We do not want to deal with nested components, the best scenario to enable us get possible template errors
    // And also not deal with child components is to mock the child component 
    @Component({
        selector: 'app-hero',
        template: '<div></div>'
    })
    class FakeHeroComponent {
        @Input() hero: Hero;
        //@Output() delete = new EventEmitter(); 
    } 

    beforeEach(() => {
        HEROES = [
            { id:1, name: 'Spider Man', strength: 1},
            { id:1, name: 'Wonder Woman', strength: 3},
            { id:1, name: 'Super Man', strength: 8},
        ];
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                FakeHeroComponent
            ],
            providers: [
                {provide: HeroService, useValue: mockHeroService}
            ],
            //schemas: [NO_ERRORS_SCHEMA],
        });
        
        fixture = TestBed.createComponent(HeroesComponent);  
    });

    it('should set heroes correctly from the service', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(3);
    });

    it('should create one li element for each hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    })
});