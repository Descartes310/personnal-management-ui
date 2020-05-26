import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBlogPostComponent } from './all-blog-post.component';

describe('AllBlogPostComponent', () => {
  let component: AllBlogPostComponent;
  let fixture: ComponentFixture<AllBlogPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBlogPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
