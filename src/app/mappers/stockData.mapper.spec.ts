
import { StockData } from '../models/stockData.model';
import StockDataMapper from './stockData.mapper';

describe('StockDataMapper', () => {
    it('should map stock data from API to StockData model', () => {
        const fakeResponseData: any = {
            id: "AMZN-2024-04-04T19:59:00.000Z",
            symbol: "AMZN",
            timestamp: new Date("2024-04-04T19:59:00.000Z"),
            volume: 25228,
            high: 180.19,
            low: 180.02,
            close: 180.03,
            open: 180.06
        };
        const expectedStockData: StockData = {
            id: "AMZN-2024-04-04T19:59:00.000Z",
            symbol: "AMZN",
            timestamp: new Date("2024-04-04T19:59:00.000Z"),
            volume: 25228,
            high: 180.19,
            low: 180.02,
            close: 180.03,
            open: 180.06
        };

        const mappedStockData = StockDataMapper.fromAPI(fakeResponseData);

        expect(mappedStockData).toEqual(expectedStockData);
    });
});
