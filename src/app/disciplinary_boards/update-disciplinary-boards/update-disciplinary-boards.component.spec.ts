import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDisciplinaryTeamsComponent } from './update-disciplinary-teams.component';

describe('UpdateDisciplinaryTeamsComponent', () => {
  let component: UpdateDisciplinaryTeamsComponent;
  let fixture: ComponentFixture<UpdateDisciplinaryTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDisciplinaryTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDisciplinaryTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
