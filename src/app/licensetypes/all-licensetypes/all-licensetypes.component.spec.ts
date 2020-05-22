import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLicensetypesComponent } from './all-licensetypes.component';

describe('AllLicensetypesComponent', () => {
  let component: AllLicensetypesComponent;
  let fixture: ComponentFixture<AllLicensetypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllLicensetypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLicensetypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
