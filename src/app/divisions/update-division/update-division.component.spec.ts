import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDivisionComponent } from './update-division.component';

describe('UpdateDivisionComponent', () => {
  let component: UpdateDivisionComponent;
  let fixture: ComponentFixture<UpdateDivisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDivisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
