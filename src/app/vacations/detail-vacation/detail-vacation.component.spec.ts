import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailVacationComponent } from './detail-vacation.component';

describe('DetailVacationComponent', () => {
  let component: DetailVacationComponent;
  let fixture: ComponentFixture<DetailVacationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailVacationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
