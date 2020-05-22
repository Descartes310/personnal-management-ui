import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBlogCategoryComponent } from './update-blog-category.component';

describe('UpdateBlogCategoryComponent', () => {
  let component: UpdateBlogCategoryComponent;
  let fixture: ComponentFixture<UpdateBlogCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBlogCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBlogCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
