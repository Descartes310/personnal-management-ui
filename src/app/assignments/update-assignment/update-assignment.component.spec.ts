import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssignmentComponent } from './update-assignment.component';

describe('UpdateAssignmentComponent', () => {
  let component: UpdateAssignmentComponent;
  let fixture: ComponentFixture<UpdateAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
