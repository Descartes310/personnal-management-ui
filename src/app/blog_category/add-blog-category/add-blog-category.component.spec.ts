import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlogCategoryComponent } from './add-blog-category.component';

describe('AddBlogCategoryComponent', () => {
  let component: AddBlogCategoryComponent;
  let fixture: ComponentFixture<AddBlogCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBlogCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBlogCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
