import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProfileComponent } from './details-profile.component';

describe('DetailsProfileComponent', () => {
  let component: DetailsProfileComponent;
  let fixture: ComponentFixture<DetailsProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
