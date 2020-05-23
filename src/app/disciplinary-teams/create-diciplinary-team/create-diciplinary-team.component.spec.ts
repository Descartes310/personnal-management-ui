import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDiciplinaryTeamComponent } from './create-diciplinary-team.component';

describe('CreateDiciplinaryTeamComponent', () => {
  let component: CreateDiciplinaryTeamComponent;
  let fixture: ComponentFixture<CreateDiciplinaryTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDiciplinaryTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDiciplinaryTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
