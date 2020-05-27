<<<<<<< HEAD:src/app/vacation/add-vacation/add-vacation.component.spec.ts
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
=======
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDisciplinaryComponent } from './all-disciplinary.component';

describe('AllDisciplinaryComponent', () => {
  let component: AllDisciplinaryComponent;
  let fixture: ComponentFixture<AllDisciplinaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDisciplinaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDisciplinaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d:src/app/disciplinaryBoard/all-disciplinary/all-disciplinary.component.spec.ts
