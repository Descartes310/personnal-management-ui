import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDisciplinaryComponent } from './details-disciplinary.component';

describe('DetailsDisciplinaryComponent', () => {
  let component: DetailsDisciplinaryComponent;
  let fixture: ComponentFixture<DetailsDisciplinaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsDisciplinaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDisciplinaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
