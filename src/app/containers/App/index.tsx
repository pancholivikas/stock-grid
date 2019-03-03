import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from 'app/reducers';
import { IStockDataModel } from 'app/models';
import { TableComponent } from '../../components'
import { StockGridConfig } from '../../config'

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    stockData: IStockDataModel;
  }
}

@connect(
  (state: RootState, ownProps): Pick<App.Props, 'stockData'> => {
    return { stockData: state.stockData ? state.stockData : {} };
  }
)
export class App extends React.Component<App.Props> {

  constructor(props: App.Props, context?: any) {
    super(props, context);
  }

  render() {
    const { stockData } = this.props;
    const gridData = Object.keys(stockData).map(data => stockData[data]);
    return (
      <div className={'container'}>
        <TableComponent data={gridData ? gridData : []} colDef={StockGridConfig.colDef} />
      </div>

    );
  }
}
