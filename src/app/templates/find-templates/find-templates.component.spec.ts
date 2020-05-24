import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindTemplatesComponent } from './find-templates.component';

describe('FindTemplatesComponent', () => {
  let component: FindTemplatesComponent;
  let fixture: ComponentFixture<FindTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
