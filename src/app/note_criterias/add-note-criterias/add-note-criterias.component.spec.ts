import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoteCriteriasComponent } from './add-note-criterias.component';

describe('AddNoteCriteriasComponent', () => {
  let component: AddNoteCriteriasComponent;
  let fixture: ComponentFixture<AddNoteCriteriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNoteCriteriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNoteCriteriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
