import { TestBed } from '@angular/core/testing';

import { SioCoreLoadingService} from './loading.service';

describe('SioCoreLoadingService', () => {
  let service: SioCoreLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SioCoreLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});