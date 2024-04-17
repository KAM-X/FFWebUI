import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { API_ROUTES } from '../../api.config';
import { StockData } from '../models/stockData.model';
import StockDataMapper from '../mappers/stockData.mapper';

@Injectable({
  providedIn: 'root',
})
export class StockDataWebsocketService {
  private messagesSubject = new Subject<StockData>();

  constructor() {
    this.connect();
  }

  public getMessages(): Observable<StockData> {
    return this.messagesSubject.asObservable();
  }

  private async connect() {
    const route = API_ROUTES.ws.negotiate;
    const response = await fetch(route);
    const data = await response.json();
    const ws = new WebSocket(data.url);

    ws.onopen = () => console.log('Connected to WebSocket');
    ws.onmessage = (event) => {
      let wsData: unknown[] = JSON.parse(event.data);
      if (!Array.isArray(wsData) && (wsData as any).hasOwnProperty('symbol')) {
        wsData = [wsData];
      }
      const marketData = wsData.map((item) => StockDataMapper.fromAPI(item));
      marketData.forEach((data) => this.messagesSubject.next(data));
      marketData.forEach((data) => console.log('a market data:', data));
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.messagesSubject.error(new Error('WebSocket error'));
    };
  }
}
