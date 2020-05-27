<<<<<<< HEAD:src/app/submissions/all-submission/all-submission.component.spec.ts
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
=======
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
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d:src/app/submissions/add-submission/add-submission.component.spec.ts
