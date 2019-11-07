import { TestBed, ComponentFixture } from '@angular/core/testing';
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
    })
})