import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsLycensetypeComponent } from './details-lycensetype.component';

describe('DetailsLycensetypeComponent', () => {
  let component: DetailsLycensetypeComponent;
  let fixture: ComponentFixture<DetailsLycensetypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsLycensetypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsLycensetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
