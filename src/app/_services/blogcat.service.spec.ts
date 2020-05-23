import { TestBed } from '@angular/core/testing';

import { BlogcatService } from './blogcat.service';

describe('BlogcatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlogcatService = TestBed.get(BlogcatService);
    expect(service).toBeTruthy();
  });
});
