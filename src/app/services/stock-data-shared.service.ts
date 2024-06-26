// stock-data-shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StockData } from '../models/stockData.model';

@Injectable({
  providedIn: 'root',
})
export class StockDataSharedService {
  private hoveredDataSubject = new BehaviorSubject<uPlot.AlignedData>([]);
  hoveredData$ = this.hoveredDataSubject.asObservable();
  private hoveredDataPercentage = new BehaviorSubject<
    number | null | undefined
  >(-1);
  stockDataPercentage$ = this.hoveredDataPercentage.asObservable();
  private selectedDataScale = new BehaviorSubject<number[]>([]);
  selectedDataScale$ = this.selectedDataScale.asObservable();

  constructor() {}

  updateData(data: any): void {
    this.hoveredDataSubject.next(data);
  }

  updateHoveredData(idx: number | null | undefined): void {
    this.hoveredDataPercentage.next(idx);
  }

  updateSelectedScale(min: number, max: number): void {
    this.selectedDataScale.next([min, max]);
  }
}
