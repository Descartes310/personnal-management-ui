import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserStatComponent } from './view-user-stat.component';

describe('ViewUserStatComponent', () => {
  let component: ViewUserStatComponent;
  let fixture: ComponentFixture<ViewUserStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
