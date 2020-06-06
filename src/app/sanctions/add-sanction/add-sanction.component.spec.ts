<<<<<<< HEAD:src/app/conges/update-conge/update-conge.component.spec.ts
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCongeComponent } from './update-conge.component';

describe('UpdateCongeComponent', () => {
  let component: UpdateCongeComponent;
  let fixture: ComponentFixture<UpdateCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
=======
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSanctionComponent } from './add-sanction.component';

describe('AddSanctionComponent', () => {
  let component: AddSanctionComponent;
  let fixture: ComponentFixture<AddSanctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSanctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSanctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d:src/app/sanctions/add-sanction/add-sanction.component.spec.ts
