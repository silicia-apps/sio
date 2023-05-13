import { TestBed } from '@angular/core/testing';

import { SioCoreLoggerService } from './logger.service';

describe('SioCoreLoggerService', () => {
  let service: SioCoreLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SioCoreLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
