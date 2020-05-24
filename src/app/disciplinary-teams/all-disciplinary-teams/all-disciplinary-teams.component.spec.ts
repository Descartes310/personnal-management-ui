import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDisciplinaryTeamsComponent } from './all-disciplinary-teams.component';

describe('AllDisciplinaryTeamsComponent', () => {
  let component: AllDisciplinaryTeamsComponent;
  let fixture: ComponentFixture<AllDisciplinaryTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDisciplinaryTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDisciplinaryTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
