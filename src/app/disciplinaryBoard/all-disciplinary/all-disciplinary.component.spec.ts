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
