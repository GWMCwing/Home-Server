import { IncomingMessage, Server, ServerResponse } from 'http';
import { WebSocketHandler } from '../websocket/handler/webSocketHandler';
export function setup_webSocketServer(
    server: Server<typeof IncomingMessage, typeof ServerResponse>,
    isInDev: boolean
): WebSocketHandler {
    return new WebSocketHandler(server, isInDev);
}
