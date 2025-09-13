import { TestBed } from '@angular/core/testing';

import { NetworkStatus } from './network-status';

describe('NetworkStatus', () => {
  let service: NetworkStatus;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkStatus);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
