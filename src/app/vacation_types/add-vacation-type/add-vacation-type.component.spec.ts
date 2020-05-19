import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVacationTypeComponent } from './add-vacation-type.component';

describe('AddVacationTypeComponent', () => {
  let component: AddVacationTypeComponent;
  let fixture: ComponentFixture<AddVacationTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVacationTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVacationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
