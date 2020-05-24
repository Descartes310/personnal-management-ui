import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBlogCategoryComponent } from './all-blog-category.component';

describe('AllBlogCategoryComponent', () => {
  let component: AllBlogCategoryComponent;
  let fixture: ComponentFixture<AllBlogCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBlogCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBlogCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
