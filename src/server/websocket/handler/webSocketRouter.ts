import {
    WebSocketCallback,
    WebSocketCallback_addListener,
    WebSocketCallback_close,
    WebSocketCallback_connection,
    WebSocketCallback_Error,
    WebSocketCallback_headers,
    WebSocketCallback_listening,
    WebSocketCallback_remove,
    WebSocketCallback_remove_close,
    WebSocketCallback_remove_connection,
    WebSocketCallback_remove_error,
    WebSocketCallback_remove_headers,
    WebSocketCallback_remove_listening,
    WebSocketEvent,
    WebSocketListener,
    WebSocketListenerObj,
} from '../../../res/type/WebSocket';
import { CLL } from '../../util/consoleLogging';
//

//
const threadName = 'WebSocketRouter';

export class WebSocketRouter {
    path: string;
    parentRouter: WebSocketRouter | null;
    nextRouter: Record<string, WebSocketRouter> = {};
    eventListener:
        | Record<
              WebSocketListener,
              | Record<WebSocketEvent, WebSocketCallback[]>
              | Record<string, never>
          >
        | Record<string, never> = {};
    constructor(path: string, parentRouter: WebSocketRouter | null = null) {
        if (path.includes('/', 1))
            CLL.warn(
                threadName,
                'RoutePath',
                'Multi-Depth path found, support for routing maybe incorrect: ',
                path
            );
        this.path = path;
        this.parentRouter = parentRouter;
    }
    //
    getPath(): string {
        if (!this.parentRouter) return '';
        return this.parentRouter.getPath() + this.path;
    }
    addRouter(router: WebSocketRouter): WebSocketRouter {
        if (this.nextRouter[router.path])
            CLL.warn(
                threadName,
                'AddRouter',
                'Overriding Router at Path: ',
                this.getPath()
            );
        this.nextRouter[router.path] = router;
        console.log(this.path, 'Added: ', router.path);
        router.setParentRouter(this);
        return this;
    }
    setParentRouter(router: WebSocketRouter) {
        this.parentRouter = router;
    }
    getRouter(path: string): WebSocketRouter | null {
        if (path == this.path) return this;
        if (!this.parentRouter) path = '/' + path;
        //remove this.path from string
        const subpath = path.slice(this.path.length);
        // get the next routePath
        const indexOfNext = subpath.indexOf('/', 1);
        let nextPath: string;
        if (indexOfNext == -1) {
            nextPath = subpath;
        } else {
            nextPath = subpath.slice(0, indexOfNext);
        }
        if (this.nextRouter[nextPath])
            return this.nextRouter[nextPath].getRouter(subpath);
        return null;
    }
    //
    // getter for event listener
    getCallback(
        listenerType: WebSocketListener,
        event: 'connection'
    ): WebSocketCallback_connection[];
    getCallback(
        listenerType: WebSocketListener,
        event: 'error'
    ): WebSocketCallback_Error[];
    getCallback(
        listenerType: WebSocketListener,
        event: 'headers'
    ): WebSocketCallback_headers[];
    getCallback(
        listenerType: WebSocketListener,
        event: 'close' | 'listening'
    ): WebSocketCallback_close[] | WebSocketCallback_listening[];
    getCallback(
        listenerType: WebSocketListener,
        event: WebSocketEvent
    ): WebSocketCallback[] {
        if (!this.eventListener[listenerType]) return [];
        return this.eventListener[listenerType][event] || [];
    }
    // setter for event listener
    on(event: 'connection', cb: WebSocketCallback_connection): WebSocketRouter;
    on(event: 'error', cb: WebSocketCallback_Error): WebSocketRouter;
    on(event: 'headers', cb: WebSocketCallback_headers): WebSocketRouter;
    on(
        event: 'close' | 'listening',
        cb: WebSocketCallback_close | WebSocketCallback_listening
    ): WebSocketRouter;
    on(event: WebSocketEvent, cb: WebSocketCallback): WebSocketRouter {
        if (!this.eventListener.on) this.eventListener.on = {};
        if (!this.eventListener.on[event]) {
            this.eventListener.on[event] = [];
        }
        this.eventListener.on[event].push(cb);
        return this;
    }
    //
    once(
        event: 'connection',
        cb: WebSocketCallback_connection
    ): WebSocketRouter;
    once(event: 'error', cb: WebSocketCallback_Error): WebSocketRouter;
    once(event: 'headers', cb: WebSocketCallback_headers): WebSocketRouter;
    once(
        event: 'close' | 'listening',
        cb: WebSocketCallback_close | WebSocketCallback_listening
    ): WebSocketRouter;
    once(event: WebSocketEvent, cb: WebSocketCallback): WebSocketRouter {
        if (!this.eventListener.once) this.eventListener.once = {};
        if (!this.eventListener.once[event]) {
            this.eventListener.once[event] = [];
        }
        this.eventListener.once[event].push(cb);
        return this;
    }
    //
    off(event: 'connection', cb: WebSocketCallback_connection): WebSocketRouter;
    off(event: 'error', cb: WebSocketCallback_Error): WebSocketRouter;
    off(event: 'headers', cb: WebSocketCallback_headers): WebSocketRouter;
    off(
        event: 'close' | 'listening',
        cb: WebSocketCallback_close | WebSocketCallback_listening
    ): WebSocketRouter;
    off(
        event: WebSocketEvent,
        cb: WebSocketCallback_addListener
    ): WebSocketRouter {
        if (!this.eventListener.off) this.eventListener.off = {};
        if (!this.eventListener.off[event]) {
            this.eventListener.off[event] = [];
        }
        this.eventListener.off[event].push(cb);
        return this;
    }
    //
    //
    removeListener(
        event: 'connection',
        cb: WebSocketCallback_remove_connection
    ): WebSocketRouter;
    removeListener(
        event: 'error',
        cb: WebSocketCallback_remove_error
    ): WebSocketRouter;
    removeListener(
        event: 'headers',
        cb: WebSocketCallback_remove_headers
    ): WebSocketRouter;
    removeListener(
        event: 'close' | 'listening',
        cb: WebSocketCallback_remove_close | WebSocketCallback_remove_listening
    ): WebSocketRouter;
    removeListener(
        event: WebSocketEvent,
        cb: WebSocketCallback_remove
    ): WebSocketRouter {
        for (const key of Object.entries(WebSocketListenerObj)) {
            const listenerList = this.eventListener[key[1]][event];
            for (let i = 0; i < listenerList.length; i++) {
                if (listenerList[i] === cb) {
                    this.eventListener[key[1]][event].splice(i);
                    return this;
                }
            }
        }
        return this;
    }
}
