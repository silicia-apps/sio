import { TestBed } from '@angular/core/testing';

import { SioAppwriteUserService } from './user.service';

describe('SioAppwriteUserService', () => {
  let service: SioAppwriteUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SioAppwriteUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
