import { Store, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { RootState, rootReducer } from 'app/reducers';
import { StockActions } from 'app/actions/store-actions';

export function configureStore(initialState?: RootState): Store<RootState> {
  let middleware = applyMiddleware(thunk);

  const store = createStore(rootReducer as any, initialState as any, middleware) as Store<
    RootState
  >;
  
  // @ts-ignore
  store.dispatch(StockActions.loadStoreData());

  return store;
}
