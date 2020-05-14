import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRoleComponent } from './details-role.component';

describe('DetailsRoleComponent', () => {
  let component: DetailsRoleComponent;
  let fixture: ComponentFixture<DetailsRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
