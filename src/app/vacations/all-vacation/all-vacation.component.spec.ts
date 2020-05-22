import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVacationComponent } from './all-vacation.component';

describe('AllVacationComponent', () => {
  let component: AllVacationComponent;
  let fixture: ComponentFixture<AllVacationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllVacationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
