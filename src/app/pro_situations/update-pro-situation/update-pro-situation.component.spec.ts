import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProSituationComponent } from './update-pro-situation.component';

describe('UpdateProSituationComponent', () => {
  let component: UpdateProSituationComponent;
  let fixture: ComponentFixture<UpdateProSituationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProSituationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
