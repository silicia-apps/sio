import { TestBed } from '@angular/core/testing';

import { SioCoreAlertService } from './alert.service';

describe('SioCoreAlertService', () => {
  let service: SioCoreAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SioCoreAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});