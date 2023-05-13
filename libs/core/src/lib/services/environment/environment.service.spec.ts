import { TestBed } from '@angular/core/testing';

import { SioCoreEnvironmentService } from './environment.service';

describe('SioCoreEnvironmentService', () => {
  let service: SioCoreEnvironmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SioCoreEnvironmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
