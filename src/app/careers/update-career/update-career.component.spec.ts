import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCareerComponent } from './update-career.component';

describe('UpdateCareerComponent', () => {
  let component: UpdateCareerComponent;
  let fixture: ComponentFixture<UpdateCareerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCareerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
