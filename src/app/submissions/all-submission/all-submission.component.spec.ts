import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSubmissionComponent } from './all-submission.component';

describe('AllSubmissionComponent', () => {
  let component: AllSubmissionComponent;
  let fixture: ComponentFixture<AllSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
