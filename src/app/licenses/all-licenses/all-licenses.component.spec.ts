import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLicensesComponent } from './all-licenses.component';

describe('AllLicensesComponent', () => {
  let component: AllLicensesComponent;
  let fixture: ComponentFixture<AllLicensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllLicensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
