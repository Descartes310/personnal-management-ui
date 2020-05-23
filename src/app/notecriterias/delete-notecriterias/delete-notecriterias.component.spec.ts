import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteNotecriteriasComponent } from './delete-notecriterias.component';

describe('DeleteNotecriteriasComponent', () => {
  let component: DeleteNotecriteriasComponent;
  let fixture: ComponentFixture<DeleteNotecriteriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteNotecriteriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteNotecriteriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
