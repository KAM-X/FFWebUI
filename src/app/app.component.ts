import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StockGraphComponent } from './components/stock-graph/stock-graph.component';
import { StockLegendComponent } from './components/stock-legend/stock-legend.component';
import { PeriodButtonsComponent } from './components/period-buttons/period-buttons.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StockGraphComponent, StockLegendComponent, PeriodButtonsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FFWebUI';
  startDatetime: Date = new Date(Date.now() - 24 * 60 * 60 * 1000);
  endDatetime: Date = new Date();
  
  updateDates(event: any) {
    this.startDatetime = new Date(event.startDatetime);
    this.endDatetime = new Date(event.endDatetime);
  }
}
