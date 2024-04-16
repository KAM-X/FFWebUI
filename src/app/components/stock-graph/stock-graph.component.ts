import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import uPlot, { AlignedData } from 'uplot';
import { StockData } from '../../models/stockData.model';
import { StockDataService } from '../../services/stock-data.service';
import stockDataAMZNResponse from '../../examples/stockDataAMZNResponse.example';
import StockDataMapper from '../../mappers/stockData.mapper';
import smallStockDataAMZNResponseExample from '../../examples/smallStockDataAMZNResponse.example';
import smallStockDataAAPLResponseExample from '../../examples/smallStockDataAAPLResponse.example';

@Component({
  selector: 'app-stock-graph',
  standalone: true,
  imports: [],
  templateUrl: './stock-graph.component.html',
})
export class StockGraphComponent {
  @ViewChild('chartElement') chartElement!: ElementRef<HTMLDivElement>;
  private uPlotInstance!: uPlot;
  data: uPlot.AlignedData = [[], [], []];
  startDatetime: Date = new Date('2024-04-04T19:23:00.000Z');
  endDatetime: Date = new Date('2024-04-04T19:59:00.000Z');

  constructor(private stockService: StockDataService) {}

  ngAfterViewInit(): void {
    this.initializeChart();
    this.fetchStockData();
  }

  fetchStockData(): void {
    /* Example response data */
    // this.populateData(smallStockDataAMZNResponseExample.map(item => StockDataMapper.fromAPI(item)), 1);
    // this.populateData(smallStockDataAAPLResponseExample.map(item => StockDataMapper.fromAPI(item)), 2);

    this.stockService.getStockData('AMZN', this.startDatetime, this.endDatetime).subscribe((amznData) => {
      this.populateData(amznData, 1);
    });

    this.stockService.getStockData('AAPL', this.startDatetime, this.endDatetime).subscribe((aaplData) => {
      this.populateData(aaplData, 2);
    });
  }

  populateData(stockDataArray: StockData[], seriesIndex: number): void {
    this.data[seriesIndex] = [];
    this.updateData(stockDataArray, seriesIndex);
  }

  updateData(newData: StockData[], seriesIndex: number): void {
    newData.forEach((stockData) => {
      if (seriesIndex === 1 || seriesIndex === 2) {
        (this.data[0] as Array<any>).push(stockData.timestamp.getTime() / 1000);
        (this.data[seriesIndex] as Array<any>).push(stockData.close);
      }
    });
    // this.data[0] = newData.map(stockData => stockData.timestamp.getTime() / 1000);
    if (this.uPlotInstance) {
      this.uPlotInstance.setData(this.data);
    }
  }

  private initializeChart(): void {
    const opts: uPlot.Options = {
      title: 'Trending stocks',
      ...this.getSize(),
      scales: {
        x: {
          auto: true,
          time: true,
          // range: (min, max) => [1712188800, 1712275200],
        },
        y: {
          auto: true,
          // range: (min, max) => [0, 1000],
        },
      },
      series: [
        { label: 'Time' },
        { label: 'AMZN Price ($)', stroke: 'red' },
        { label: 'AAPL Price ($)', stroke: 'blue' }, // New series for AAPL
      ],
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

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.uPlotInstance.setSize(this.getSize());
  }
}
