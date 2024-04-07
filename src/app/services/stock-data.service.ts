import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { StockData } from '../models/stockData.model';
import { API_ROUTES } from '../../api.config';
import StockDataMapper from '../mappers/stockData.mapper';

@Injectable({
  providedIn: 'root'
})
export class StockDataService {

  constructor(public http: HttpClient) {}

  getStockData(stockSymbol: string, startDatetime: Date, endDatetime: Date): Observable<StockData[]> {
    const route = API_ROUTES.stock.get(stockSymbol, startDatetime, endDatetime);
    return this.http.get<any[]>(route).pipe(
      map(response => response.map(item => StockDataMapper.fromAPI(item)))
    );
  }
}
