import { IncomingMessage } from 'http';
import WebSocket from 'ws';

export type WebSocketCallback_connection = (
    this: WebSocket.Server<WebSocket>,
    socket: WebSocket,
    request: IncomingMessage
) => void;
export type WebSocketCallback_Error = (
    this: WebSocket.Server<WebSocket>,
    headers: string[],
    request: IncomingMessage
) => void;
export type WebSocketCallback_headers = (
    this: WebSocket.Server<WebSocket>,
    headers: string[],
    request: IncomingMessage
) => void;
export type WebSocketCallback_close = (
    this: WebSocket.Server<WebSocket>
) => void;
export type WebSocketCallback_listening = WebSocketCallback_close;
//
export type WebSocketCallback_remove_connection = (client: WebSocket) => void;
export type WebSocketCallback_remove_error = (err: Error) => void;
export type WebSocketCallback_remove_headers = (
    headers: string[],
    request: IncomingMessage
) => void;
export type WebSocketCallback_remove_close = () => void;
export type WebSocketCallback_remove_listening = WebSocketCallback_remove_close;
//
export type WebSocketCallback_remove =
    | WebSocketCallback_remove_connection
    | WebSocketCallback_remove_error
    | WebSocketCallback_remove_headers
    | WebSocketCallback_remove_close
    | WebSocketCallback_remove_listening;
export type WebSocketCallback_addListener =
    | WebSocketCallback_connection
    | WebSocketCallback_Error
    | WebSocketCallback_headers
    | WebSocketCallback_close
    | WebSocketCallback_listening;
//
export type WebSocketCallback =
    | WebSocketCallback_addListener
    | WebSocketCallback_remove;
//
export type WebSocketEvent =
    | 'connection'
    | 'error'
    | 'headers'
    | 'close'
    | 'listening';
export type WebSocketListener = keyof typeof WebSocketListenerObj;
export const WebSocketListenerObj = {
    on: 'on',
    once: 'once',
    off: 'off',
} as const;
