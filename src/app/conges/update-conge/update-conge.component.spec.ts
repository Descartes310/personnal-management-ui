import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCongeComponent } from './update-conge.component';

describe('UpdateCongeComponent', () => {
  let component: UpdateCongeComponent;
  let fixture: ComponentFixture<UpdateCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
