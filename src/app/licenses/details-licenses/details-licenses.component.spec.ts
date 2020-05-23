import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsLicensesComponent } from './details-licenses.component';

describe('DetailsLicensesComponent', () => {
  let component: DetailsLicensesComponent;
  let fixture: ComponentFixture<DetailsLicensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsLicensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
