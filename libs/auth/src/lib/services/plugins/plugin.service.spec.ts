import { TestBed } from '@angular/core/testing';

import { SioAuthPluginService } from './plugin.service';

describe('SioAuthPluginService', () => {
  let service: SioAuthPluginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SioAuthPluginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
