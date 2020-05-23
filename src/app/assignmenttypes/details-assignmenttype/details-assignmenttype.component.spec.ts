import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAssignmenttypeComponent } from './details-assignmenttype.component';

describe('DetailsAssignmenttypeComponent', () => {
  let component: DetailsAssignmenttypeComponent;
  let fixture: ComponentFixture<DetailsAssignmenttypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsAssignmenttypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsAssignmenttypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
