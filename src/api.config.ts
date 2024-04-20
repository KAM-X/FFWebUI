import { environment } from './environments/environment';

const API_BASE = environment.apiRoute;

export const API_ROUTES = {
  base: API_BASE,
  stock: {
    get: (stockSymbol: string, startDatetime: Date, endDatetime: Date) => {
      const params = new URLSearchParams({
        startDatetime: startDatetime.toISOString(),
        endDatetime: endDatetime.toISOString(),
      });

      return `${API_BASE}/v1/stock/${stockSymbol}?${params.toString()}`;
    },
  },
  ws: {
    negotiate: `${API_BASE}/negotiate`,
  }
};