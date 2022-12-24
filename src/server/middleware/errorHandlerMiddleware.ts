import { errorHandler, serveErrorPage } from './error/errorHandler';
import { Express } from 'express';
export function loadErrorHandlerMiddleware(app: Express) {
    app.use(serveErrorPage);
    app.use(errorHandler);
}
