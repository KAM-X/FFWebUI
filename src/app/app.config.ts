import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { StockDataService } from './services/stock-data.service';
import { StockDataWebsocketService } from './services/stock-data-websocket.service';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: StockDataService },
    { provide: StockDataWebsocketService },
  ],
};
