import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StockDataSharedService } from '../../services/stock-data-shared.service';

@Component({
  selector: 'app-stock-legend',
  standalone: true,
  imports: [],
  templateUrl: './stock-legend.component.html',
  styleUrl: './stock-legend.component.css',
})
export class StockLegendComponent implements OnInit {
  @Input() stock1Name?: string = 'AMZN';
  @Input() stock1Data1?: string = '-280$(-1.44%) Past day';
  @Input() stock1Data2?: string = 'Market open: 2024-04-08';

  @Input() stock2Name?: string = 'AAPL';
  @Input() stock2Data1?: string = '+190$(+2.44%) Past day';
  @Input() stock2Data2?: string = 'Market open: 2024-04-08';

  private subscriptions: Subscription = new Subscription();
  stockData: uPlot.AlignedData = [[], [], []];
  stockPercentage: number[] = [];
  idx: number | null | undefined;
  scale: number[] = [0, 0];
  constructor(private sharedService: StockDataSharedService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.sharedService.hoveredData$.subscribe((data) => {
        this.stockData = data;
      })
    );
    this.subscriptions.add(
      this.sharedService.stockDataPercentage$.subscribe((data) => {
        this.idx = data;
      })
    );
    this.subscriptions.add(
      this.sharedService.selectedDataScale$.subscribe((data) => {
        this.scale = data;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe(); // Clean up to avoid memory leaks
  }

  // Helper functions to generate display strings dynamically
  getStockDisplay(id: number): string {
    if (
      !this.stockData ||
      !this.stockData[id] ||
      this.stockData[id].length <= 1
    ) {
      return 'N/A';
    }

    if (this.idx == null || this.idx == null) {
      this.idx = this.scale[1];
    }

    const hoveredData = this.stockData.map((series) => series[this.idx!]);
    const stock1Base = this.stockData[id][this.scale[0]];
    const stockPercentage =
      ((hoveredData[id]! - stock1Base!) / stock1Base!) * 100;
    if (hoveredData[id] != null || hoveredData[id] != undefined) {
      return `${hoveredData[id]!.toFixed(2)}$ (${stockPercentage.toFixed(2)}%)`;
    }
    return 'N/A';
  }

  getStockDate(): string {
    if (
      !this.stockData ||
      !this.stockData[0] ||
      this.stockData[0].length <= 1
    ) {
      return 'N/A';
    }

    if (this.idx == null || this.idx == null) {
      this.idx = this.stockData[0].length - 1;
    }
    const hoveredData = this.stockData.map((series) => series[this.idx!]);

    const date = new Date(hoveredData[0]! * 1000);

    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
}
