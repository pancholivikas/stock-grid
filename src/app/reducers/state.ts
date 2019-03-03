import { IStockDataModel } from 'app/models';

export interface RootState {
  stockData: RootState.StockData;
}

export namespace RootState {
  export type StockData = IStockDataModel;
}
