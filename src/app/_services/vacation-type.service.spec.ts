import { TestBed } from '@angular/core/testing';

import { VacationTypeService } from './vacation-type.service';

describe('VacationTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VacationTypeService = TestBed.get(VacationTypeService);
    expect(service).toBeTruthy();
  });
});
