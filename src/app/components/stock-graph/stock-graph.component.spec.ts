import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockGraphComponent } from './stock-graph.component';
import { StockData } from '../../models/stockData.model';
import { of } from 'rxjs';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { StockDataWebsocketService } from '../../services/stock-data-websocket.service';

describe('StockGraphComponent', () => {
  let component: StockGraphComponent;
  let fixture: ComponentFixture<StockGraphComponent>;
  let mockStockDataWebsocketService: any;

  beforeEach(async () => {
    mockStockDataWebsocketService = jasmine.createSpyObj(
      'StockDataWebsocketService',
      ['getMessages', 'connect']
    );

    await TestBed.configureTestingModule({
      imports: [StockGraphComponent],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: StockDataWebsocketService,
          useValue: mockStockDataWebsocketService,
        },
      ],
    }).compileComponents();

    mockStockDataWebsocketService.getMessages.and.returnValue(of([]));
    fixture = TestBed.createComponent(StockGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a graph', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.u-over')).toBeTruthy();
  });

  it('should call API to get stock data', () => {
    const fakeResponseData: StockData[] = [
      {
        id: 'AMZN-2024-04-04T19:59:00.000Z',
        symbol: 'AMZN',
        timestamp: new Date('2024-04-04T19:59:00.000Z'),
        volume: 25228,
        high: 180.19,
        low: 180.02,
        close: 180.03,
        open: 180.06,
      },
      {
        id: 'AMZN-2024-04-04T19:58:00.000Z',
        symbol: 'AMZN',
        timestamp: new Date('2024-04-04T19:58:00.000Z'),
        volume: 10269,
        high: 180.145,
        low: 180.045,
        close: 180.065,
        open: 180.105,
      },
    ];
    const getStockDataSpy = spyOn(
      component['stockService'],
      'getStockData'
    ).and.callFake(() => of(fakeResponseData));

    component.ngAfterViewInit();

    expect(getStockDataSpy).toHaveBeenCalledWith(
      'AMZN',
      component.startDatetime,
      component.endDatetime
    );
  });

  it('should update the graph when new data is provided', () => {
    const initData: StockData[] = [
      {
        id: '1',
        symbol: 'AMZN',
        timestamp: new Date('2024-04-07'),
        volume: 100,
        high: 100,
        low: 100,
        close: 10,
        open: 0,
      },
      {
        id: '2',
        symbol: 'AMZN',
        timestamp: new Date('2024-04-06'),
        volume: 100,
        high: 100,
        low: 100,
        close: 5,
        open: 0,
      },
    ];

    const newData: StockData[] = [
      {
        id: '3',
        symbol: 'AMZN',
        timestamp: new Date('2024-04-05'),
        volume: 100,
        high: 100,
        low: 100,
        close: 2,
        open: 0,
      },
      {
        id: '4',
        symbol: 'AMZN',
        timestamp: new Date('2024-04-04'),
        volume: 100,
        high: 100,
        low: 100,
        close: 1000,
        open: 0,
      },
    ];

    const resultData = [
      [
        new Date('2024-04-04').getTime() / 1000,
        new Date('2024-04-05').getTime() / 1000,
        new Date('2024-04-06').getTime() / 1000,
        new Date('2024-04-07').getTime() / 1000,
      ],
      [1000, 2, 5, 10],
      [null, null, null, null],
    ];

    component.populateData(initData, 1);
    fixture.detectChanges();

    const updateSpy = spyOn(component, 'updateData').and.callThrough();
    component.updateData(newData, 1);

    expect(updateSpy).toHaveBeenCalledWith(newData, 1);

    expect(component['uPlotInstance'].data).toEqual(resultData);
  });
});
