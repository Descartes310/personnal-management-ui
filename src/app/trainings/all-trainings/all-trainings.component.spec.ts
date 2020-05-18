import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTrainingsComponent } from './all-trainings.component';

describe('AllTrainingsComponent', () => {
  let component: AllTrainingsComponent;
  let fixture: ComponentFixture<AllTrainingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTrainingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
