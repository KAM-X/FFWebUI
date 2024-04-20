import { Component, ElementRef, HostListener, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import uPlot, { AlignedData } from 'uplot';
import { StockData } from '../../models/stockData.model';
import { StockDataService } from '../../services/stock-data.service';
import stockDataAMZNResponse from '../../examples/stockDataAMZNResponse.example';
import StockDataMapper from '../../mappers/stockData.mapper';
import smallStockDataAMZNResdata from '../../examples/smallStockDataAMZNResponse.example';
import smallStockDataAAPLResponseExample from '../../examples/smallStockDataAAPLResponse.example';
import { StockDataWebsocketService } from '../../services/stock-data-websocket.service';
import { StockDataSharedService } from '../../services/stock-data-shared.service';


@Component({
  selector: 'app-stock-graph',
  standalone: true,
  imports: [],
  templateUrl: './stock-graph.component.html',
})
export class StockGraphComponent implements OnChanges {
  @ViewChild('chartElement') chartElement!: ElementRef<HTMLDivElement>;
  private uPlotInstance!: uPlot;
  data: uPlot.AlignedData = [[], [], []];
  @Input() startDatetime: Date = new Date('2024-04-04T19:23:00.000Z');
  @Input() endDatetime: Date = new Date('2024-04-04T19:59:00.000Z');
  graphDisplayStartDatetime = new Date('2024-04-04T15:30:00.000Z'); // Not yet used
  graphDisplayEndDatetime = new Date('2024-04-04T23:59:00.000Z'); // Not yet used

  timestampSet = new Set<number>();
  stocksByTimestamp = new Map<number, Map<string, StockData>>();

  stockSymbolToSeriesIndexMap = new Map<string, number>([
    ['AMZN', 1],
    ['AAPL', 2],
  ]);

  constructor(
    private sharedService: StockDataSharedService,
    private stockService: StockDataService,
    private wsService: StockDataWebsocketService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startDatetime'] || changes['endDatetime']) {
      this.fetchStockData();
    }
  }

  ngAfterViewInit(): void {
    this.initializeChart();
    this.fetchStockData();
    this.initRealtimeData();
  }

  initRealtimeData(): void {
    this.wsService.getMessages().subscribe({
      next: (stockData) => {
        const seriesIndex = this.stockSymbolToSeriesIndexMap.get(
          stockData.symbol
        );
        if (seriesIndex) {
          this.updateData([stockData], seriesIndex);
          console.log('updating graph with stock data:', stockData);
        }
      },
      error: (error) => {
        console.error('Error updating graph with stock data:', error);
      },
    });
  }

  fetchStockData(): void {
    this.timestampSet.clear();
    this.stocksByTimestamp.clear();
    /* Example response data */
    // this.populateData(smallStockDataAMZNResponseExample.map(item => StockDataMapper.fromAPI(item)), 1);
    // this.populateData(smallStockDataAAPLResponseExample.map(item => StockDataMapper.fromAPI(item)), 2);

    this.stockService
      .getStockData('AMZN', this.startDatetime, this.endDatetime)
      .subscribe((amznData) => {
        this.populateData(
          amznData,
          this.stockSymbolToSeriesIndexMap.get('AMZN')!
        );
      });

    this.stockService
      .getStockData('AAPL', this.startDatetime, this.endDatetime)
      .subscribe((aaplData) => {
        this.populateData(
          aaplData,
          this.stockSymbolToSeriesIndexMap.get('AAPL')!
        );
      });
  }

  populateData(stockDataArray: StockData[], seriesIndex: number): void {
    this.data[seriesIndex] = [];
    this.updateData(stockDataArray, seriesIndex);
  }

  updateData(newData: StockData[], seriesIndex: number): void {
    newData.forEach((stockData) => {
      if (seriesIndex === 1 || seriesIndex === 2) {
        const timestamp = stockData.timestamp.getTime() / 1000;
        this.timestampSet.add(timestamp);
        if (!this.stocksByTimestamp.has(timestamp)) {
          this.stocksByTimestamp.set(timestamp, new Map<string, StockData>());
        }
        this.stocksByTimestamp.get(timestamp)?.set(stockData.symbol, stockData);
      }
    });

    const newChartData: uPlot.AlignedData = [[], [], []];

    Array.from(this.timestampSet)
      .sort()
      .forEach((timestamp) => {
        const stockDataMap = this.stocksByTimestamp.get(timestamp);
        if (stockDataMap) {
          (newChartData[0] as any[]).push(timestamp);
          (newChartData[1] as any[]).push(
            stockDataMap.get('AMZN')?.close || null
          );
          (newChartData[2] as any[]).push(
            stockDataMap.get('AAPL')?.close || null
          );
        }
      });

    this.data = newChartData;

    if (this.uPlotInstance) {
      this.uPlotInstance.setData(this.data);
      this.sharedService.updateData(this.data);
    }
  }

  private initializeChart(): void {
    const opts: uPlot.Options = {
      // title: 'Trending stocks',
      ...this.getSize(),
      scales: {
        x: {
          auto: true,
          time: true,
        },
        y: {
          auto: true,
        },
      },
      series: [
        { label: 'Time' },
        {
          label: 'AMZN Price ($)',
          stroke: 'red',
        },
        { label: 'AAPL Price ($)', stroke: 'blue' },
      ],
      legend: {
        show: false,
      },
      hooks: {
        setCursor: [
          (u) => {
            this.logDataAtCursor(u, u.cursor.idx);
          },
        ],
      },
    };

    this.uPlotInstance = new uPlot(
      opts,
      this.data,
      this.chartElement.nativeElement
    );
  }

  getSize() {
    return {
      width: this.chartElement.nativeElement.offsetWidth,
      height: this.chartElement.nativeElement.offsetHeight - 50,
    };
  }

  logDataAtCursor(uPlotInstance: uPlot, idx: number | null | undefined): void {
    if (!this.data) {
      return;
    }
    this.sharedService.updateHoveredData(idx);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.uPlotInstance.setSize(this.getSize());
  }
}
