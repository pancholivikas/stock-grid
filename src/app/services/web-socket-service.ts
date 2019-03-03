import * as Rx from "rxjs";

export class WebSocketService{
    connection: WebSocket;
    constructor(url: string) {
        this.connection = new WebSocket(url);
    }

    startConnection(): Promise<WebSocket> {
        return new Promise((resolve, reject) => {
            this.connection.onopen = () => {
                resolve(this.connection);
            };
            this.connection.onerror = (err) => {
                reject(err);
            };
        });
    }

    onMessage(): Rx.Subject<any> {
        const subject = new Rx.Subject();
        this.startConnection().then(connection => {
            this.connection = connection;
            connection.onmessage = (data) => {
                subject.next(JSON.parse(data.data));
            }
            connection.onerror = (err) => {
                subject.error(err);
            }
        });
        return subject;
    }
}