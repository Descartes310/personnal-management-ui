import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNoteCriteriasComponent } from './update-note-criterias.component';

describe('UpdateNoteCriteriasComponent', () => {
  let component: UpdateNoteCriteriasComponent;
  let fixture: ComponentFixture<UpdateNoteCriteriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateNoteCriteriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNoteCriteriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
