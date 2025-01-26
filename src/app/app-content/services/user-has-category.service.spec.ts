import { TestBed } from '@angular/core/testing';

import { UserHasCategoryService } from '../services/user-has-category.service';

describe('UserHasCategoryService', () => {
  let service: UserHasCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserHasCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
