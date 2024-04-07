import { TestBed } from '@angular/core/testing';

import { StockDataService } from './stock-data.service';
import { environment } from '../../environments/environment';

describe('StockDataService', () => {
  let service: StockDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a method called getStockData', () => {
    expect(service.getStockData).toBeTruthy();
  });

  it('should fetch correct url when called for certain period', () => {
    const startDatetime = new Date('2021-01-01T00:00:00Z');
    const endDatetime = new Date('2021-01-02T00:00:00Z');
    const expectedUrl = `${environment.apiRoute}/v1/stock/AMZN?startDatetime=2021-01-01T00%3A00%3A00.000Z&endDatetime=2021-01-02T00%3A00%3A00.000Z`;
    const spy = spyOn(service.http, 'get').and.callFake(() => {
      return {
        subscribe: () => {}
      };
    });

    service.getStockData('AMZN', startDatetime, endDatetime);

    expect(spy).toHaveBeenCalledWith(expectedUrl);
  });
});
