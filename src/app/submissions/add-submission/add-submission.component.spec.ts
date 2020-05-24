import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubmissionComponent } from './add-submission.component';

describe('AddSubmissionComponent', () => {
  let component: AddSubmissionComponent;
  let fixture: ComponentFixture<AddSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
