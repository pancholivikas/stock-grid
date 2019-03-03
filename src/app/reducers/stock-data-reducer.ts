import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { IStockDataModel, Stock } from '../models/stock-model';
import { StockActions } from 'app/actions/store-actions';

const initialState: RootState.StockData = {
};

function addUpdateStock(prevState: IStockDataModel, data: Array<[string, number]>) {
    data.forEach((item: [string, number]) => {
        if (prevState.hasOwnProperty(item[0])) {
            const existingStock: Stock = prevState[item[0]] as Stock;
            const newObj = existingStock.updateStock(existingStock, item[1]);
            prevState = Object.assign({}, prevState, { [item[0]]: newObj });
        } else {
            prevState[item[0]] = new Stock(
                item[0],
                item[1],
                0,
                [item[1]]
            );
        }
    });
    return prevState;
}

export const stockReducer = handleActions<RootState.StockData, IStockDataModel>(
    {
        [StockActions.Type.LOAD_STOCK_DATA]: (state, action: any) => {
            return Object.assign({},
                state,
                addUpdateStock(
                    Object.assign({}, state) as IStockDataModel,
                    action.data as Array<[string, number]>
                )
            );
        }
    },
    initialState
);