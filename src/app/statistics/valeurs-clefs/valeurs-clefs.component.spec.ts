import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValeursClefsComponent } from './valeurs-clefs.component';

describe('ValeursClefsComponent', () => {
  let component: ValeursClefsComponent;
  let fixture: ComponentFixture<ValeursClefsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValeursClefsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValeursClefsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
