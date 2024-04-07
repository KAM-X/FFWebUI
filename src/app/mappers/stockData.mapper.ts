import { StockData } from "../models/stockData.model";

export default class StockDataMapper {
    public static fromAPI(stockData: any): StockData {
        return {
            id: stockData.id,
            symbol: stockData.symbol,
            timestamp: new Date(stockData.timestamp),
            volume: stockData.volume,
            high: stockData.high,
            low: stockData.low,
            close: stockData.close,
            open: stockData.open,
        };
    }
}