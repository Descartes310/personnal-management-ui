import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionVacationComponent } from './decision-vacation.component';

describe('DecisionVacationComponent', () => {
  let component: DecisionVacationComponent;
  let fixture: ComponentFixture<DecisionVacationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionVacationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
