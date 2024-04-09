import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import uPlot, { AlignedData } from 'uplot';
import { StockData } from '../../models/stockData.model';
import { StockDataService } from '../../services/stock-data.service';
import stockDataAMZNResponse from '../../examples/stockDataAMZNResponse.example';
import StockDataMapper from '../../mappers/stockData.mapper';
import smallStockDataAMZNResponseExample from '../../examples/smallStockDataAMZNResponse.example';

@Component({
  selector: 'app-stock-graph',
  standalone: true,
  imports: [],
  templateUrl: './stock-graph.component.html',
})

export class StockGraphComponent {
  @ViewChild('chartElement') chartElement!: ElementRef<HTMLDivElement>;
  private uPlotInstance!: uPlot;
  data: uPlot.AlignedData = [[], []];
  startDatetime: Date = new Date('2024-04-04');
  endDatetime: Date = new Date('2024-04-05');

  constructor(private stockService: StockDataService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeChart();

    // Example response data
    // this.populateData(smallStockDataAMZNResponseExample.map(item => StockDataMapper.fromAPI(item)));

    this.stockService.getStockData('AMZN', this.startDatetime, this.endDatetime).subscribe((stockDataArray) => {
      this.populateData(stockDataArray);
    });
  }

  populateData(stockDataArray: StockData[]): void {
    // Reset existing data
    this.data = [[], []];
    this.updateData(stockDataArray);
  }

  updateData(newData: StockData[]) {
    newData.forEach((stockData) => {
      (this.data[0] as number[]).push(stockData.timestamp.getTime() / 1000); // Convert Date to timestamp
      (this.data[1] as number[]).push(stockData.close);
    });

    if (this.uPlotInstance) {
      this.uPlotInstance.setData(this.data);
    }
  }

  private initializeChart(): void {
    const opts: uPlot.Options = {
      title: "",
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
        { label: "Time" },
        { label: "Price ($)", stroke: "red" },
      ],
    };

    this.uPlotInstance = new uPlot(opts, this.data, this.chartElement.nativeElement);
  }

  getSize() {
    return {
      width: this.chartElement.nativeElement.offsetWidth,
      height: this.chartElement.nativeElement.offsetHeight - 50,
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.uPlotInstance.setSize(this.getSize());
  }
}
