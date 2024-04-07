import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockData } from '../models/stockData.model';
import { environment } from '../../environments/environment';
import { API_ROUTES } from '../../api.config';

@Injectable({
  providedIn: 'root'
})
export class StockDataService {

  constructor(public http: HttpClient) {}

  getStockData(stockSymbol: string, startDatetime: Date, endDatetime: Date): Observable<StockData[]> {
    const route = API_ROUTES.stock.get(stockSymbol, startDatetime, endDatetime);
    return this.http.get<StockData[]>(route);
  }
}
