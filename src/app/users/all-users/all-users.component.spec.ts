<<<<<<< HEAD:src/app/conges/all-conge/all-conge.component.spec.ts
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCongeComponent } from './all-conge.component';

describe('AllCongeComponent', () => {
  let component: AllCongeComponent;
  let fixture: ComponentFixture<AllCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
=======
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUsersComponent } from './all-users.component';

describe('AllUsersComponent', () => {
  let component: AllUsersComponent;
  let fixture: ComponentFixture<AllUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d:src/app/users/all-users/all-users.component.spec.ts
