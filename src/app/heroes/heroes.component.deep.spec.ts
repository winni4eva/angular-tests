import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { HeroComponent } from '../hero/hero.component';;

describe('HeroesComponent (Deep Test)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    beforeEach(() => {
        HEROES = [
            { id:1, name: 'Spider Man', strength: 1 },
            { id:1, name: 'Wonder Woman', strength: 3 },
            { id:1, name: 'Super Man', strength: 8 },
        ];
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                HeroComponent
            ],
            providers: [
                {provide: HeroService, useValue: mockHeroService}
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });
        
        fixture = TestBed.createComponent(HeroesComponent);  
    });

    it('should render each hero as a hero component', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        // Despite running the change detection on the HeroesComponent fixture, it wall apply to all child components to
        // run ngOnInit
        fixture.detectChanges();

        // By.directive(HeroComponent) Will get me all elements that are attached to a HeroComponent
        // components are directives to like eg routerLink
        const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentDEs.length).toBe(3);
        heroComponentDEs.forEach((heroComponent, index) => {
            expect(heroComponent.componentInstance.hero).toEqual(HEROES[index]);
        });
    });
});