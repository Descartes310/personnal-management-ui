import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBlogPostComponent } from './update-blog-post.component';

describe('UpdateBlogPostComponent', () => {
  let component: UpdateBlogPostComponent;
  let fixture: ComponentFixture<UpdateBlogPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBlogPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
