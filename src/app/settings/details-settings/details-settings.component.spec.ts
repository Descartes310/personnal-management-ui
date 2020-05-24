import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSettingsComponent } from './details-settings.component';

describe('DetailsSettingsComponent', () => {
  let component: DetailsSettingsComponent;
  let fixture: ComponentFixture<DetailsSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
