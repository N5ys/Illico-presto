import { TestBed } from '@angular/core/testing';

import { OrderPollingService } from './order-polling.service';

describe('OrderPollingService', () => {
  let service: OrderPollingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderPollingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
