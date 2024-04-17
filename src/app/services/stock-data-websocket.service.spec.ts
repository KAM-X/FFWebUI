import { TestBed } from '@angular/core/testing';

import { StockDataWebsocketService } from './stock-data-websocket.service';

describe('StockDataWebsocketService', () => {
  let service: StockDataWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockDataWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
