import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDisciplinaryTeamComponent } from './details-disciplinary-team.component';

describe('DetailsDisciplinaryTeamComponent', () => {
  let component: DetailsDisciplinaryTeamComponent;
  let fixture: ComponentFixture<DetailsDisciplinaryTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsDisciplinaryTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDisciplinaryTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
