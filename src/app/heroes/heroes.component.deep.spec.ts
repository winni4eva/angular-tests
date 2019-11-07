import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { HeroComponent } from '../hero/hero.component';

@Directive({
    selector: '[routerLink]',
    host: { '(click)': 'onClick()' } // TO get the onClick event handler fired we need to add the host method
    // we are listening for a click event and the method we are listening on to is onClick
})
export class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams: any;
    navigatedTo: any = undefined;

    onClick(){
        // If the link is clicked navigated to will no longer be undefined 
        this.navigatedTo = this.linkParams;
    }
}

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
                HeroComponent,
                RouterLinkDirectiveStub
            ],
            providers: [
                {provide: HeroService, useValue: mockHeroService}
            ],
            //schemas: [NO_ERRORS_SCHEMA],
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

    it(`should call heroService.deleteHero when the (Child) hero Component's delete button is clicked`, () => {
        spyOn(fixture.componentInstance, 'deleteHero');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
        // We can trigger the click event ourselves
        // heroComponentDEs[0].query(By.css('button'))
            //.triggerEventHandler('click', {stopPropagation: () => {}});
        
            // Or we can trigger the delete method on the child compoenent directly
        //(<HeroComponent>heroComponentDEs[0].componentInstance).delete.emit();

        // Another option is to trigger the default event handler directly
        heroComponentDEs[0].triggerEventHandler('delete', undefined);

        
        expect(fixture.componentInstance.deleteHero).toHaveBeenCalledWith(HEROES[0]);
    });

    it('should add a new hero to our hero list when the add button is clicked', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const name = 'Thor';
        mockHeroService.addHero.and.returnValue(of({id:5, name, strength: 15}));
        const inputElement = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

        inputElement.value = name;
        addButton.triggerEventHandler('click', undefined);
        fixture.detectChanges(); // To make sure our Heroes array is updated with the newly returned hero

        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
        expect(heroText).toContain(name);
    });

    it('should have the correct route for the first hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges(); 
        const heroComponents  = fixture.debugElement.queryAll(By.directive(HeroComponent)); 
        let routerLink = heroComponents[0]
            .query(By.directive(RouterLinkDirectiveStub))
            .injector.get(RouterLinkDirectiveStub);

        heroComponents[0].query(By.css('a')).triggerEventHandler('click', undefined);
        
        expect(routerLink.navigatedTo).toBe('/detail/1');
    });
});