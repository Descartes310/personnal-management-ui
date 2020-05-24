import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVacationComponent } from './add-vacation.component';

describe('AddVacationComponent', () => {
  let component: AddVacationComponent;
  let fixture: ComponentFixture<AddVacationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVacationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
