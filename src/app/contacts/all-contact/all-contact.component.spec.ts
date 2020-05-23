import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllContactComponent } from './all-contact.component';

describe('AllContactComponent', () => {
  let component: AllContactComponent;
  let fixture: ComponentFixture<AllContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
