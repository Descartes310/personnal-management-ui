import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDiciplinaryTeamComponent } from './update-diciplinary-team.component';

describe('UpdateDiciplinaryTeamComponent', () => {
  let component: UpdateDiciplinaryTeamComponent;
  let fixture: ComponentFixture<UpdateDiciplinaryTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDiciplinaryTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDiciplinaryTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
