import { TestBed } from '@angular/core/testing';

import { SioDatabasePluginService } from './plugin.service';

describe('SioDatabasePluginService', () => {
  let service: SioDatabasePluginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SioDatabasePluginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
