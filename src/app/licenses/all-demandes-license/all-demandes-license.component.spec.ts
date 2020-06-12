import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDemandesLicenseComponent } from './all-demandes-license.component';

describe('AllDemandesLicenseComponent', () => {
  let component: AllDemandesLicenseComponent;
  let fixture: ComponentFixture<AllDemandesLicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDemandesLicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDemandesLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
