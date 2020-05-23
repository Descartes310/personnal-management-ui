import { TestBed } from '@angular/core/testing';

import { NoteCriteriaService } from './note-criteria.service';

describe('NoteCriteriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoteCriteriaService = TestBed.get(NoteCriteriaService);
    expect(service).toBeTruthy();
  });
});
