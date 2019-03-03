import * as React from 'react';
import * as Styles from './table-style.css';
import { Stock } from 'app/models';

export interface ITableProps {
    data: Array<any>;
    colDef: Array<any>;
}

export class TableComponent extends React.Component<ITableProps> {

    constructor(props: ITableProps, context?: any) {
        super(props, context);
    }

    getTableHeader = (data: Array<string>) => {
        const tableHeader = data.map((item, index) => {
            return (
                <td key={index}>{item}</td>
            );
        });
        return tableHeader;
    }

    getTableRows = (data: Array<Stock>) => {
        const tableBody = data.map((item: Stock) => {
            const diff = item.diff;
            const className = (diff > 0)
                ? Styles.backgroundBlue
                : (diff < 0)
                    ? Styles.backgroundRed
                    : Styles.backgroundWhite;

            return (
                <tr key={item.name.trim()}>
                    <td>{item.name}</td>
                    <td className={className}>{item.price}</td>
                </tr>
            );
        });
        return tableBody;
    }

    render() {
        return (
            <table className={`${Styles.table} table`}>
                <thead>
                    <tr>
                        {this.getTableHeader(this.props.colDef)}
                    </tr>
                </thead>
                <tbody>
                    {this.getTableRows(this.props.data)}
                </tbody>
            </table>
        )
    }

}
