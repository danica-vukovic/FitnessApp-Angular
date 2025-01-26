import { TestBed } from '@angular/core/testing';

import { ProgramHasAttributeService } from './program-has-attribute.service';

describe('ProgramHasAttributeService', () => {
  let service: ProgramHasAttributeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramHasAttributeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
