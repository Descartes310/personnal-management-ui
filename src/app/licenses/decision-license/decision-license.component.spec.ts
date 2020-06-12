import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionLicenseComponent } from './decision-license.component';

describe('DecisionLicenseComponent', () => {
  let component: DecisionLicenseComponent;
  let fixture: ComponentFixture<DecisionLicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionLicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
