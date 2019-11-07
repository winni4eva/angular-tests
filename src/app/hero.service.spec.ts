import { TestBed, inject } from "@angular/core/testing";
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; // Will help us inject a mock http testing module

describe('HeroService', () => {
    let mockMessageService;
    let httpTestingController: HttpTestingController;
    let service: HeroService;

    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add']);
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [
                HeroService,
                {provide: MessageService, useValue: mockMessageService}
            ]
        });

        httpTestingController = TestBed.get(HttpTestingController); // get method helps return a handle to any service
        service = TestBed.get(HeroService);

        //Another way to get this is by using the inject function, example commented below
    });

    // Aternative way of getting a service and http test controller
    // It however requires much mor code
    // describe('getHero', () => {
    //     it('it should call get with the correct url', 
    //         inject([HeroService, HttpTestingController], (service: HeroService, controller: HttpTestingController) => {
    //          service.getHero(4).subscribe();
    //     }));
    // });

    describe('getHero', () => {
        it('it should call get with the correct url', () => {
            service.getHero(4).subscribe();

            //These two expectations would be met before the subscribe callback above is executed
            const req = httpTestingController.expectOne('api/heroes/4');
            req.flush({id: 4, name: 'Super Man', strength: 100});
            httpTestingController.verify();
        });
    });
});