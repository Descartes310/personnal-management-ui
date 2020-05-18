import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProSituationComponent } from './details-pro-situation.component';

describe('DetailsProSituationComponent', () => {
  let component: DetailsProSituationComponent;
  let fixture: ComponentFixture<DetailsProSituationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsProSituationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsProSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
