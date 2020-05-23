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
