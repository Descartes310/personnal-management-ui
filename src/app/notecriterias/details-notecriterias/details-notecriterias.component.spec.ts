import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsNotecriteriasComponent } from './details-notecriterias.component';

describe('DetailsNotecriteriasComponent', () => {
  let component: DetailsNotecriteriasComponent;
  let fixture: ComponentFixture<DetailsNotecriteriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsNotecriteriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsNotecriteriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
