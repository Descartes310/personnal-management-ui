import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLicensetypesComponent } from './update-licensetypes.component';

describe('UpdateLicensetypesComponent', () => {
  let component: UpdateLicensetypesComponent;
  let fixture: ComponentFixture<UpdateLicensetypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateLicensetypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLicensetypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
