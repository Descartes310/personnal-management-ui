import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindTrainingsComponent } from './find-trainings.component';

describe('FindTrainingsComponent', () => {
  let component: FindTrainingsComponent;
  let fixture: ComponentFixture<FindTrainingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindTrainingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
