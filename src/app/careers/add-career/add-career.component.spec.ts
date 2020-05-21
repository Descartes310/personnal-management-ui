import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCareerComponent } from './add-career.component';

describe('AddCareerComponent', () => {
  let component: AddCareerComponent;
  let fixture: ComponentFixture<AddCareerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCareerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
