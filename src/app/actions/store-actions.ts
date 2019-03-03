import * as Redux from 'redux';
import { WebSocketService, LoggerService } from 'app/services';

export interface IStockAction {
    type: StockActions.Type;
    data: Array<Array<[string, number]>>;
}

export namespace StockActions {
    export enum Type {
        LOAD_STOCK_DATA = 'LOAD_STOCK_DATA'
    }

    export function loadStockDataSuccess(data: any): IStockAction {
        return {
            data,
            type: Type.LOAD_STOCK_DATA
        }
    }

    export const loadStoreData = () => {
        return (dispatch: Redux.Dispatch) => {
            const connect = new WebSocketService('ws://stocks.mnet.website');
            connect.onMessage()
                .subscribe(data => {
                    handleUpdateMessage(data);
                    dispatch(loadStockDataSuccess(data));
                });
        }
    }

    function handleUpdateMessage(data: Array<Array<[string, number]>>) {
        data.forEach(([name, price]) => LoggerService(`${name}: ${price}`));
      }
}

export type StockActions = Omit<typeof StockActions, 'Type'>;
