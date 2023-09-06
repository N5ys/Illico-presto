import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { serverGuard } from './server.guard';

describe('serverGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => serverGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
