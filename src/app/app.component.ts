import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StockGraphComponent } from './components/stock-graph/stock-graph.component';
import { StockLegendComponent } from './components/stock-legend/stock-legend.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StockGraphComponent, StockLegendComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FFWebUI';
}
