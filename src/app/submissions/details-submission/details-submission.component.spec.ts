import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSubmissionComponent } from './details-submission.component';

describe('DetailsSubmissionComponent', () => {
  let component: DetailsSubmissionComponent;
  let fixture: ComponentFixture<DetailsSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
