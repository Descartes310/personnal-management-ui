import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSanctionComponent } from './details-sanction.component';

describe('DetailsSanctionComponent', () => {
  let component: DetailsSanctionComponent;
  let fixture: ComponentFixture<DetailsSanctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsSanctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSanctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
