import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVacationTypeComponent } from './update-vacation-type.component';

describe('UpdateVacationTypeComponent', () => {
  let component: UpdateVacationTypeComponent;
  let fixture: ComponentFixture<UpdateVacationTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateVacationTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVacationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
