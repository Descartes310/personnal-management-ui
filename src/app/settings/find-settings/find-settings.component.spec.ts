import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindSettingsComponent } from './find-settings.component';

describe('FindSettingsComponent', () => {
  let component: FindSettingsComponent;
  let fixture: ComponentFixture<FindSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
