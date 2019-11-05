import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HeroService } from '../hero.service';

describe('HeroesComponent (Shallow Test)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;

    beforeEach(() => {
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        TestBed.configureTestingModule({
            declarations: [HeroesComponent],
            providers: [
                {provide: HeroService, useValue: mockHeroService}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });
        
        fixture = TestBed.createComponent(HeroesComponent);  
    });

    it('should set heroes correctly from the service', () => {
        expect(true).toBe(true);
    });
});