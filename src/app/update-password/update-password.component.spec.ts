<<<<<<< HEAD:src/app/vacation/update-vacation/update-vacation.component.spec.ts
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVacationComponent } from './update-vacation.component';

describe('UpdateVacationComponent', () => {
  let component: UpdateVacationComponent;
  let fixture: ComponentFixture<UpdateVacationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateVacationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
=======
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePasswordComponent } from './update-password.component';

describe('UpdatePasswordComponent', () => {
  let component: UpdatePasswordComponent;
  let fixture: ComponentFixture<UpdatePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d:src/app/update-password/update-password.component.spec.ts
