import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { loadPreMiddleware } from '../middleware/preMiddleware';
import { CLL } from '../util/consoleLogging';
import { initiateDatabaseInterface } from '../database/databaseInterface';
import { serveStatic } from '../middleware/static/serveStatic';
import { setupRouter } from '../router/rootRouter';
import { loadErrorHandlerMiddleware } from '../middleware/errorHandlerMiddleware';

import { Express } from 'express';
import { MongoClient } from 'mongodb';
//
const threadName = 'Main';
//
function setupLogging(app: Express, isInDev: boolean) {
    if (isInDev) {
        app.use(morgan('dev'));
    } else {
        app.use(morgan('combined'));
    }
}
function setupRendering(app: Express) {
    app.set('view engine', 'pug');
}
function setupRequestParser(app: Express) {
    app.use(cookieParser());
}
export function startup_expressServer(
    app: Express,
    db: MongoClient,
    port: number,
    isInDev: boolean
) {
    //
    setupLogging(app, isInDev);
    setupRendering(app);

    app.set('trust proxy', 1);
    setupRequestParser(app);
    //
    // serving static files and
    // prevent webpage from showing in search engine
    loadPreMiddleware(app, db);
    //
    initiateDatabaseInterface(db, 'Express' + (isInDev ? '_dev' : ''));
    //
    serveStatic(app);
    //
    setupRouter(app);
    //
    loadErrorHandlerMiddleware(app);
    app.listen(port, function () {
        CLL.log(threadName, 'Express Startup', `Running on port ${port}`);
    });
}
