import { IncomingMessage, Server, ServerResponse } from 'http';
import { WebSocketHandler } from '../websocket/handler/webSocketHandler';
import { setupWebSocketRouter } from '../websocket/rootRouter';
export function setup_webSocketServer(
    server: Server<typeof IncomingMessage, typeof ServerResponse>,
    isInDev: boolean
): WebSocketHandler {
    const rootRouter = setupWebSocketRouter();
    return new WebSocketHandler(server, rootRouter, isInDev);
}
