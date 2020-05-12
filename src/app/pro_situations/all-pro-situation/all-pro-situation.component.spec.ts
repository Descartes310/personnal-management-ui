import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProSituationComponent } from './all-pro-situation.component';

describe('AllProSituationComponent', () => {
  let component: AllProSituationComponent;
  let fixture: ComponentFixture<AllProSituationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllProSituationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
