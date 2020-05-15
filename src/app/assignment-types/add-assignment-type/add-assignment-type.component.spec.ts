import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssignmentTypeComponent } from './add-assignment-type.component';

describe('AddAssignmentTypeComponent', () => {
  let component: AddAssignmentTypeComponent;
  let fixture: ComponentFixture<AddAssignmentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssignmentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssignmentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
