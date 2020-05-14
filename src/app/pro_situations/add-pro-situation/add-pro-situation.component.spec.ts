import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProSituationComponent } from './add-pro-situation.component';

describe('AddProSituationComponent', () => {
  let component: AddProSituationComponent;
  let fixture: ComponentFixture<AddProSituationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProSituationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
