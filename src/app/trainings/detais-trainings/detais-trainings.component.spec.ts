import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaisTrainingsComponent } from './detais-trainings.component';

describe('DetaisTrainingsComponent', () => {
  let component: DetaisTrainingsComponent;
  let fixture: ComponentFixture<DetaisTrainingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetaisTrainingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaisTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
