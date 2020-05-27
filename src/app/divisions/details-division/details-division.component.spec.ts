import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDivisionComponent } from './details-division.component';

describe('DetailsDivisionComponent', () => {
  let component: DetailsDivisionComponent;
  let fixture: ComponentFixture<DetailsDivisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsDivisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
