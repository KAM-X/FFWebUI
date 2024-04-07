import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { StockDataService } from './stock-data.service';
import { environment } from '../../environments/environment';
import { of, pipe } from 'rxjs';
import { StockData } from '../models/stockData.model';

describe('StockDataService', () => {
  let service: StockDataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(StockDataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a method called getStockData', () => {
    expect(service.getStockData).toBeTruthy();
  });

  it('should fetch correct url when getStockData called for certain period', () => {
    const startDatetime = new Date('2021-01-01T00:00:00Z');
    const endDatetime = new Date('2021-01-02T00:00:00Z');
    const expectedUrl = `${environment.apiRoute}/v1/stock/AMZN?startDatetime=2021-01-01T00%3A00%3A00.000Z&endDatetime=2021-01-02T00%3A00%3A00.000Z`;
    const spy = spyOn(service.http, 'get').and.callFake(() => of([]) as any); 

    service.getStockData('AMZN', startDatetime, endDatetime);

    expect(spy).toHaveBeenCalledWith(expectedUrl);
  });

  it('should return mapped stock data when getStockData called for certain period', () => {
    const fakeApiResponseData: StockData[] = [{
      id: "AMZN-2024-04-04T19:59:00.000Z",
      symbol: "AMZN",
      timestamp: new Date("2024-04-04T19:59:00.000Z"),
      volume: 25228,
      high: 180.19,
      low: 180.02,
      close: 180.03,
      open: 180.06
    },
    {
      id: "AMZN-2024-04-04T19:58:00.000Z",
      symbol: "AMZN",
      timestamp: new Date("2024-04-04T19:58:00.000Z"),
      volume: 10269,
      high: 180.145,
      low: 180.045,
      close: 180.065,
      open: 180.105
    }];
    const spy = spyOn(service.http, 'get').and.callFake(() => of(fakeApiResponseData) as any); 

    service.getStockData('AMZN', new Date(), new Date()).subscribe((data) => {
      expect(data).toEqual(fakeApiResponseData);
    });
  });
});
