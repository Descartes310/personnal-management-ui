import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTrainingsComponent } from './details-trainings.component';

describe('DetailsTrainingsComponent', () => {
  let component: DetailsTrainingsComponent;
  let fixture: ComponentFixture<DetailsTrainingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTrainingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
