import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockGraphComponent } from './stock-graph.component';
import { StockData } from '../../models/stockData.model';

describe('StockGraphComponent', () => {
  let component: StockGraphComponent;
  let fixture: ComponentFixture<StockGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockGraphComponent]
    })
      .compileComponents();

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

  it('should update the graph when new data is provided', () => {
    const initData: StockData[] = [
      {
        id: '1',
        symbol: 'Amzn',
        timestamp: new Date('2024-04-07'),
        volume: 100,
        high: 100,
        low: 100,
        close: 10,
        open: 0,
      },
      {
        id: '2',
        symbol: 'Amzn',
        timestamp: new Date('2024-04-06'),
        volume: 100,
        high: 100,
        low: 100,
        close: 5,
        open: 0,
      }
    ];
    const newData: StockData[] = [
      {
        id: '3',
        symbol: 'Amzn',
        timestamp: new Date('2024-04-05'),
        volume: 100,
        high: 100,
        low: 100,
        close: 2,
        open: 0,
      },
      {
        id: '4',
        symbol: 'Amzn',
        timestamp: new Date('2024-04-04'),
        volume: 100,
        high: 100,
        low: 100,
        close: 1000,
        open: 0,
      }
    ];
    const resultData = [[
      new Date('2024-04-07').getTime() / 1000,
      new Date('2024-04-06').getTime() / 1000,
      new Date('2024-04-05').getTime() / 1000,
      new Date('2024-04-04').getTime() / 1000,
    ],
    [10, 5, 2, 1000]
    ];

    component.populateData(initData);
    fixture.detectChanges();

    const updateSpy = spyOn(component, 'updateData').and.callThrough();
    component.updateData(newData);

    expect(updateSpy).toHaveBeenCalledWith(newData);

    expect(component["uPlotInstance"].data).toEqual(resultData);
  });
});
