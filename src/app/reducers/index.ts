import { combineReducers } from 'redux';
import { RootState } from './state';
import { stockReducer } from './stock-data-reducer';
export { RootState };

export const rootReducer = combineReducers<RootState>({
  stockData: stockReducer as any
});
