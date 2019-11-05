import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeroComponent (Shallow Test)', () => {
    let fixture: ComponentFixture<HeroComponent>;

    beforeEach(() => {
        // Focus module config for this specific test
        // Testbed call ngOninit automatically
        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });
        // Get fixture instance from TestBed
        fixture = TestBed.createComponent(HeroComponent);  
    });

    it('should render a hero name in an anchor tag', () => {
        // componentInstance gives us access to the component
        fixture.componentInstance.hero = { id:1, name: 'Super Man', strength: 3};
        fixture.detectChanges();  

        // nativeElement gives us an instance to the DOM
        // there is another api debugElement which behaves the same as the nativeElement
        expect(fixture.nativeElement.querySelector('a').textContent ).toContain('Super Man');
        
        // the debug element provides an extra capability of giving us access to an elements directives
        // We can even find the component a debug element belongs to
        let de = fixture.debugElement.query(By.css('a'));
        expect(de.nativeElement.textContent).toContain('Super Man'); 
    });
});