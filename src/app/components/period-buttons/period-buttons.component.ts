import { Component, EventEmitter, Output } from '@angular/core';

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
  currentSelected: string = '1D'; // Default selected period

  constructor() { }
}
