import { TestBed } from '@angular/core/testing';

import { SioCorePluginService } from './plugin.service';

describe('SioCorePluginService', () => {
  let service: SioCorePluginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SioCorePluginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
