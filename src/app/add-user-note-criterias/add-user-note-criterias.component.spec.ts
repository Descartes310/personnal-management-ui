import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserNoteCriteriasComponent } from './add-user-note-criterias.component';

describe('AddUserNoteCriteriasComponent', () => {
  let component: AddUserNoteCriteriasComponent;
  let fixture: ComponentFixture<AddUserNoteCriteriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserNoteCriteriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserNoteCriteriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
