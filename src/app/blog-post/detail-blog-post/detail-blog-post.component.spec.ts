import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBlogPostComponent } from './detail-blog-post.component';

describe('DetailBlogPostComponent', () => {
  let component: DetailBlogPostComponent;
  let fixture: ComponentFixture<DetailBlogPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailBlogPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
