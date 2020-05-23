<<<<<<< HEAD:src/app/conges/details-conge/details-conge.component.spec.ts
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCongeComponent } from './details-conge.component';

describe('DetailsCongeComponent', () => {
  let component: DetailsCongeComponent;
  let fixture: ComponentFixture<DetailsCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
=======
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCareerComponent } from './update-career.component';

describe('UpdateCareerComponent', () => {
  let component: UpdateCareerComponent;
  let fixture: ComponentFixture<UpdateCareerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCareerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d:src/app/careers/update-career/update-career.component.spec.ts
