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

  constructor() {}

  // updateHoveredData(data: any[], stockPercentage: number[]): void {
  //   this.hoveredDataSubject.next(data);
  //   this.hoveredDataPercentage.next(stockPercentage);
  // }
  updateData(data: any): void {
    this.hoveredDataSubject.next(data);
  }

  updateHoveredData(idx: number | null | undefined): void {
    this.hoveredDataPercentage.next(idx);
  }
}
