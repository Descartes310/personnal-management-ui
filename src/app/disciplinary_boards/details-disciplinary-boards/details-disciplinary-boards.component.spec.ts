import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDisciplinaryTeamsComponent } from './details-disciplinary-teams.component';

describe('DetailsDisciplinaryTeamsComponent', () => {
  let component: DetailsDisciplinaryTeamsComponent;
  let fixture: ComponentFixture<DetailsDisciplinaryTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsDisciplinaryTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDisciplinaryTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
