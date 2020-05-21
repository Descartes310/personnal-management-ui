import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDisciplinaryBoardsComponent } from './add-disciplinary-boards.component';

describe('AddDisciplinaryBoardsComponent', () => {
  let component: AddDisciplinaryBoardsComponent;
  let fixture: ComponentFixture<AddDisciplinaryBoardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDisciplinaryBoardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDisciplinaryBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
