import { Component, EventEmitter, Output } from '@angular/core';
import { StockDataService } from '../../services/stock-data.service';

export interface PeriodChangeEvent {
  period: string;
}

@Component({
  selector: 'app-period-buttons',
  templateUrl: './period-buttons.component.html',
  styleUrls: ['./period-buttons.component.css'],
  standalone: true
})
export class PeriodButtonsComponent {
  @Output() periodChange = new EventEmitter<PeriodChangeEvent>();
  currentSelected: string = '1D';

  constructor(private stockDataService: StockDataService) {}

  onPeriodSelect(period: string) {
    this.currentSelected = period;
    console.log(`Button clicked for period: ${period}`);
    this.periodChange.emit({ period });

    let startDatetime = new Date();
    let endDatetime = new Date();

    switch (period) {
      case '1D':
        startDatetime.setDate(startDatetime.getDate() - 1);
        break;
      case '7D':
        startDatetime.setDate(startDatetime.getDate() - 7);
        break;
      case '1M':
        startDatetime.setMonth(startDatetime.getMonth() - 1);
        break;
      case '6M':
        startDatetime.setMonth(startDatetime.getMonth() - 6);
        break;
      case 'YTD':
        startDatetime = new Date(new Date().getFullYear(), 0, 1);
        break;
      case '1Y':
        startDatetime.setFullYear(startDatetime.getFullYear() - 1);
        break;
      case '5Y':
        startDatetime.setFullYear(startDatetime.getFullYear() - 5);
        break;
    }

    this.stockDataService.getStockData('AAPL', startDatetime, endDatetime)
        .subscribe(data => {
          console.log('Stock Data for period:', period, data);
        });
  }
}
