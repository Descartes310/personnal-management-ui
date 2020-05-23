import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDivisionComponent } from './all-division.component';

describe('AllDivisionComponent', () => {
  let component: AllDivisionComponent;
  let fixture: ComponentFixture<AllDivisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDivisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
