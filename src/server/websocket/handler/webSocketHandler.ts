import { Server, IncomingMessage, ServerResponse } from 'http';
import WebSocket from 'ws';

export class WebSocketHandler {
    #wss: WebSocket.Server<WebSocket.WebSocket>;
    #isInDev: boolean;
    constructor(
        server: Server<typeof IncomingMessage, typeof ServerResponse>,
        isInDev: boolean
    ) {
        this.#wss = new WebSocket.Server({ server });
        this.#isInDev = isInDev;
    }
}
