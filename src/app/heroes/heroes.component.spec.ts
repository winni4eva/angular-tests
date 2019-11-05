import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';

describe('HeroesComponent', () => {
    let component: HeroesComponent; 
    let HEROES;
    let mockHeroService;

    beforeEach(() => {
        HEROES = [
            {id:1, name: 'Spider Man', strength: 8},
            {id:2, name: 'Wonder Woman', strength: 24},
            {id:3, name: 'Super Man', strength: 55},
        ];
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        component = new HeroesComponent(mockHeroService); // Self contruct component for testing, no lifecycle hooks
    });

    describe('delete', () => {
        it('should remove the indicated heroe from the heroes list', () => { // Checked that the heroes state has changed
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;

            component.delete(HEROES[2]);

            expect(component.heroes.length).toBe(2);
        });

        it('should call deleteHero', () => { // prepend x to it to skip test
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;

            component.delete(HEROES[2]);

            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
        });

    });
})