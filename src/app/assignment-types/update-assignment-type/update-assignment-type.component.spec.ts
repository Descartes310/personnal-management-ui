import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssignmentTypeComponent } from './update-assignment-type.component';

describe('UpdateAssignmentTypeComponent', () => {
  let component: UpdateAssignmentTypeComponent;
  let fixture: ComponentFixture<UpdateAssignmentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAssignmentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAssignmentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
