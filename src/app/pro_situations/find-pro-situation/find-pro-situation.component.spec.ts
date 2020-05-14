import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindProSituationComponent } from './find-pro-situation.component';

describe('FindProSituationComponent', () => {
  let component: FindProSituationComponent;
  let fixture: ComponentFixture<FindProSituationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindProSituationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindProSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
