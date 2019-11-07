import { TestBed, ComponentFixture, fakeAsync, tick, flush, async } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('HeroDetailComponent', () => {
    let fixture: ComponentFixture<HeroDetailComponent> , mockActivatedRoute, mockHeroService, mockLocation;

    beforeEach(() => {
        mockActivatedRoute = {
            snapshot: { paramMap: { get: () => { return '3' } } }
        };
        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
        mockLocation = jasmine.createSpyObj(['back']);

        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [
                HeroDetailComponent
            ],
            providers: [
                {provide: ActivatedRoute, useValue: mockActivatedRoute },
                {provide: HeroService, useValue: mockHeroService},
                {provide: Location, useValue: mockLocation}
            ]
        });
        fixture = TestBed.createComponent(HeroDetailComponent);
        mockHeroService.getHero.and.returnValue(of({id: 2, name: 'Doctor Strange', strength: 20}));
    });

    it('should render hero name in a h2 tag', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('DOCTOR STRANGE');
    });

    // Added done provided by jasmine to ensure we wait for async processes to complete
    // This code is slow because we are relying on setTimeout to wait for our asynchronous code to complete 
    // before we run our expectations, a better way will be to use fakeAsync
    // it('should call updateHero when save is called', (done) => { 
    //     mockHeroService.updateHero.and.returnValue(of({}));
    //     fixture.detectChanges();

    //     fixture.componentInstance.save();
    //     setTimeout(() => {
    //         expect(mockHeroService.updateHero).toHaveBeenCalled();
    //         done();
    //     }, 300);
    // });

    it('should call updateHero when save is called', fakeAsync(() => { // Using the fakeAsync will help us treat the synchronous code like it was synchronous
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();
        //This will move the clock 250 milliseconds and call any code that needs 
        //to be called within that time. Helps if you know how long it will take
        //tick(250); 
        flush(); //waits for asynchronous calls to complete by fast forwarding time, this is powered by zonejs
        
        expect(mockHeroService.updateHero).toHaveBeenCalled();
    }));

    // it('should call updateHero when save is called', async(() => { // async also works courtesy zone.js, it doesnt work well with setTimeouts, fakeAsync works better
    //     mockHeroService.updateHero.and.returnValue(of({}));
    //     fixture.detectChanges();

    //     fixture.componentInstance.save();
        
    //     // returns a promise when all other promises from our components have been resolved
    //     fixture.whenStable().then(() => {
    //         expect(mockHeroService.updateHero).toHaveBeenCalled();
    //     });
    // }));
})