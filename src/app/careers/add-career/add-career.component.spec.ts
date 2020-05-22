import { async, ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD
=======
<<<<<<< HEAD:src/app/users/all-users/all-users.component.spec.ts
import { AllUsersComponent } from './all-users.component';

describe('AllUsersComponent', () => {
  let component: AllUsersComponent;
  let fixture: ComponentFixture<AllUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllUsersComponent ]
=======
>>>>>>> 4c68845b85ccd6b1ba02e00f1ae190e6f8e4bce3
import { AddCareerComponent } from './add-career.component';

describe('AddCareerComponent', () => {
  let component: AddCareerComponent;
  let fixture: ComponentFixture<AddCareerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCareerComponent ]
<<<<<<< HEAD
=======
>>>>>>> 4c68845b85ccd6b1ba02e00f1ae190e6f8e4bce3:src/app/careers/add-career/add-career.component.spec.ts
>>>>>>> 4c68845b85ccd6b1ba02e00f1ae190e6f8e4bce3
    })
    .compileComponents();
  }));

  beforeEach(() => {
<<<<<<< HEAD
    fixture = TestBed.createComponent(AddCareerComponent);
=======
<<<<<<< HEAD:src/app/users/all-users/all-users.component.spec.ts
    fixture = TestBed.createComponent(AllUsersComponent);
=======
    fixture = TestBed.createComponent(AddCareerComponent);
>>>>>>> 4c68845b85ccd6b1ba02e00f1ae190e6f8e4bce3:src/app/careers/add-career/add-career.component.spec.ts
>>>>>>> 4c68845b85ccd6b1ba02e00f1ae190e6f8e4bce3
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
