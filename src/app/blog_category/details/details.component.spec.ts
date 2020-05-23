<<<<<<< HEAD:src/app/conges/add-conge/add-conge.component.spec.ts
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCongeComponent } from './add-conge.component';

describe('AddCongeComponent', () => {
  let component: AddCongeComponent;
  let fixture: ComponentFixture<AddCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
=======
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d:src/app/blog_category/details/details.component.spec.ts
