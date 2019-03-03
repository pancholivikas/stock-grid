export interface IStockDataModel {
    [key:string]: IStockModel;
}

export interface IStockModel {
    name: string;
    price: number;
    diff: number;
    historicData: Array<number>;
}

export class Stock {
    name: string;
    price: number;
    diff: number;
    historicData: Array<number>;

    constructor(name: string, price: number, diff: number, historicData: Array<number>) {
        this.name = name;
        this.price = price;
        this.diff = diff;
        this.historicData = historicData;
    }

    public updateStock(stock: Stock, price: number): Stock {
        return new Stock(
            stock.name,
            price,
            this.isPriceSameAs(price) ? 0 : this.getPriceDiff(price),
            stock.historicData.concat(price)
        );
    }

    public addPriceToHistory(price: number) {
        this.historicData.push(price);
    }

    public getName(): string {
        return this.name;
    }

    public getPrice(): number {
        return this.price;
    }

    public getHistoricData(): Array<number> {
        return this.historicData;
    }

    public getPriceDiff(price: number): number {
        return price - this.price;
    }

    public isPriceSameAs(price: number):boolean {
        return this.price === price;
    }
}