import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateUpdateComponent } from './template-update.component';

describe('TemplateUpdateComponent', () => {
  let component: TemplateUpdateComponent;
  let fixture: ComponentFixture<TemplateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
