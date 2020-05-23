import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDemandesVacationComponent } from './all-demandes-vacation.component';

describe('AllDemandesVacationComponent', () => {
  let component: AllDemandesVacationComponent;
  let fixture: ComponentFixture<AllDemandesVacationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDemandesVacationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDemandesVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
