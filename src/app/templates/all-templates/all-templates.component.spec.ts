import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTemplatesComponent } from './all-templates.component';

describe('AllTemplatesComponent', () => {
  let component: AllTemplatesComponent;
  let fixture: ComponentFixture<AllTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
