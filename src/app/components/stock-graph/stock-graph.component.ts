import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import uPlot, { AlignedData } from 'uplot';
import { StockData } from '../../models/stockData.model';

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

  // fakeStockDataArray: StockData[] = [
  //   {
  //     id: '1',
  //     symbol: 'Amzn',
  //     timestamp: new Date('2024-04-07'),
  //     volume: 100,
  //     high: 100,
  //     low: 100,
  //     close: 10,
  //     open: 0,
  //   },
  //   {
  //     id: '2',
  //     symbol: 'Amzn',
  //     timestamp: new Date('2024-04-06'),
  //     volume: 100,
  //     high: 100,
  //     low: 100,
  //     close: 5,
  //     open: 0,
  //   }
  // ]


  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initializeChart();
    // this.populateData(this.fakeStockDataArray);

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
          time: true,
          range: (min, max) => [1566453600, 1566813540],
        },
        y: {
          auto: true,
          range: (min, max) => [0, 100],
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
