import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTemplatesComponent } from './details-templates.component';

describe('DetailsTemplatesComponent', () => {
  let component: DetailsTemplatesComponent;
  let fixture: ComponentFixture<DetailsTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
