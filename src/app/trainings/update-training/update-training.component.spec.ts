import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTrainingComponent } from './update-training.component';

describe('UpdateTrainingComponent', () => {
  let component: UpdateTrainingComponent;
  let fixture: ComponentFixture<UpdateTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
