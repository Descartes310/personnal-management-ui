import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSanctionComponent } from './add-sanction.component';

describe('AddSanctionComponent', () => {
  let component: AddSanctionComponent;
  let fixture: ComponentFixture<AddSanctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSanctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSanctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
