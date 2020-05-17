import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLicensetypesComponent } from './add-licensetypes.component';

describe('AddLicensetypesComponent', () => {
  let component: AddLicensetypesComponent;
  let fixture: ComponentFixture<AddLicensetypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLicensetypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLicensetypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
