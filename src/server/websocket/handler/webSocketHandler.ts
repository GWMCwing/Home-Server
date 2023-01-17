import { Server, IncomingMessage, ServerResponse } from 'http';
import WebSocket, { ServerOptions } from 'ws';
import { CLL } from '../../util/consoleLogging';
import { WebSocketRouter } from './webSocketRouter';
//
const threadName = 'WebSocket';
//
export class WebSocketHandler {
    static #instance: WebSocketHandler;
    #wss!: WebSocket.Server<WebSocket.WebSocket>;
    #rootRouter!: WebSocketRouter;
    #isInDev!: boolean;
    constructor(
        server: Server<typeof IncomingMessage, typeof ServerResponse>,
        rootRouter: WebSocketRouter,
        isInDev: boolean
    ) {
        if (WebSocketHandler.#instance) return WebSocketHandler.#instance;
        WebSocketHandler.#instance = this;
        const WebSocketOption: ServerOptions = {
            // backlog: 10,
            clientTracking: true,
            server: server,
        };
        this.#wss = new WebSocket.Server(WebSocketOption);
        this.#rootRouter = rootRouter;
        this.#isInDev = isInDev;
        this.#setupHandler();
    }
    #getRouter(path: string): WebSocketRouter | null {
        //TODO: get from map instead of searching, update map after a miss but hit on depth search
        return this.#rootRouter.getRouter(path);
    }
    #setupHandler() {
        this.#setupListener_on();
        this.#setupListener_once();
        this.#setupListener_off();
    }
    #setupListener_on() {
        this.#wss.on('connection', (socket, request) => {
            // if (!request.url) request.url = '/';
            // const router = this.#rootRouter.getRouter(request.url);
            const router = this.#getRouter(request.url || '/');
            if (!router) return;
            const callbackList = router.getCallback('on', 'connection');
            for (let i = 0; i < callbackList.length; i++) {
                //? can callback break the callback chain?
                callbackList[i].bind(this.#wss)(socket, request);
            }
        });
        this.#wss.on('error', (error) => {
            // if (!request.url) request.url = '/';
            // const router = this.#rootRouter.getRouter(request.url);
            CLL.error(threadName, error.name);
            CLL.error(threadName, error.message);
            if (error.stack) CLL.error(threadName, error.stack);
        });
        this.#wss.on('headers', (headers, request) => {
            const router = this.#getRouter(request.url || '/');
            if (!router) return;
            const callbackList = router.getCallback('on', 'headers');
            for (let i = 0; i < callbackList.length; i++) {
                //? can callback break the callback chain?
                callbackList[i].bind(this.#wss)(headers, request);
            }
        });
        //? do I need this wrapper
        this.#wss.on('close', () => {
            CLL.log(threadName, 'Event_Close', 'Socket Closed');
        });
        this.#wss.on('listening', () => {
            CLL.log(threadName, 'Event_Listening', 'Socket is Listening');
        });
    }
    #setupListener_once() {
        this.#wss.once('connection', (socket, request) => {
            // if (!request.url) request.url = '/';
            // const router = this.#rootRouter.getRouter(request.url);
            const router = this.#getRouter(request.url || '/');
            if (!router) return;
            const callbackList = router.getCallback('once', 'connection');
            for (let i = 0; i < callbackList.length; i++) {
                //? can callback break the callback chain?
                callbackList[i].bind(this.#wss)(socket, request);
            }
        });
        this.#wss.once('error', (error) => {
            // if (!request.url) request.url = '/';
            // const router = this.#rootRouter.getRouter(request.url);
            CLL.error(threadName, error.name);
            CLL.error(threadName, error.message);
            if (error.stack) CLL.error(threadName, error.stack);
        });
        this.#wss.once('headers', (headers, request) => {
            const router = this.#getRouter(request.url || '/');
            if (!router) return;
            const callbackList = router.getCallback('once', 'headers');
            for (let i = 0; i < callbackList.length; i++) {
                //? can callback break the callback chain?
                callbackList[i].bind(this.#wss)(headers, request);
            }
        });
        //? do I need this wrapper
        this.#wss.once('close', () => {
            CLL.log(threadName, 'Event_Close', 'Socket Closed');
        });
        this.#wss.once('listening', () => {
            CLL.log(threadName, 'Event_Listening', 'Socket is Listening');
        });
    }
    #setupListener_off() {
        this.#wss.off('connection', (socket, request) => {
            // if (!request.url) request.url = '/';
            // const router = this.#rootRouter.getRouter(request.url);
            const router = this.#getRouter(request.url || '/');
            if (!router) return;
            const callbackList = router.getCallback('off', 'connection');
            for (let i = 0; i < callbackList.length; i++) {
                //? can callback break the callback chain?
                callbackList[i].bind(this.#wss)(socket, request);
            }
        });
        this.#wss.off('error', (error) => {
            // if (!request.url) request.url = '/';
            // const router = this.#rootRouter.getRouter(request.url);
            CLL.error(threadName, error.name);
            CLL.error(threadName, error.message);
            if (error.stack) CLL.error(threadName, error.stack);
        });
        this.#wss.off('headers', (headers, request) => {
            const router = this.#getRouter(request.url || '/');
            if (!router) return;
            const callbackList = router.getCallback('off', 'headers');
            for (let i = 0; i < callbackList.length; i++) {
                //? can callback break the callback chain?
                callbackList[i].bind(this.#wss)(headers, request);
            }
        });
        //? do I need this wrapper
        this.#wss.off('close', () => {
            CLL.log(threadName, 'Event_Close', 'Socket Closed');
        });
        this.#wss.off('listening', () => {
            CLL.log(threadName, 'Event_Listening', 'Socket is Listening');
        });
    }
    // mapping
    startMapping() {
        //TODO: Map route after first build
    }
    updateMapping(fullPath: string, router: WebSocketRouter) {
        //TODO: update map route after first build
    }
    //
    get rootRouter() {
        return this.#rootRouter;
    }
}
