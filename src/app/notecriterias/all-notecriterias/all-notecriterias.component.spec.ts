import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNotecriteriasComponent } from './all-notecriterias.component';

describe('AllNotecriteriasComponent', () => {
  let component: AllNotecriteriasComponent;
  let fixture: ComponentFixture<AllNotecriteriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllNotecriteriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllNotecriteriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
