import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-legend',
  standalone: true,
  imports: [],
  templateUrl: './stock-legend.component.html',
  styleUrl: './stock-legend.component.css'
})
export class StockLegendComponent implements OnInit {
  @Input() stock1Name?: string = 'NVIDIA';
  @Input() stock1Data1?: string = '-280$(-1.44%) Past day';
  @Input() stock1Data2?: string = 'Market open: 2024-04-08';

  @Input() stock2Name?: string = 'AMD';
  @Input() stock2Data1?: string = '+190$(+2.44%) Past day';
  @Input() stock2Data2?: string = 'Market open: 2024-04-08';

  constructor() {}

  ngOnInit(): void {}
}