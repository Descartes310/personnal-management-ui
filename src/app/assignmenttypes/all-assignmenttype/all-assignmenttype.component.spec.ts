import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAssignmenttypeComponent } from './all-assignmenttype.component';

describe('AllAssignmenttypeComponent', () => {
  let component: AllAssignmenttypeComponent;
  let fixture: ComponentFixture<AllAssignmenttypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAssignmenttypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAssignmenttypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
