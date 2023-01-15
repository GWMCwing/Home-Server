import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { loadPreMiddleware } from '../middleware/preMiddleware';
import { CLL } from '../util/consoleLogging';
import { initiateDatabaseInterface } from '../database/databaseInterface';
import { serveStatic } from '../middleware/static/serveStatic';
import { setupRouter } from '../router/rootRouter';
import { loadErrorHandlerMiddleware } from '../middleware/errorHandlerMiddleware';
//
import { Express } from 'express';
import { createServer as createServer_http } from 'http';
import { createServer as createServer_https } from 'https';
import { MongoClient } from 'mongodb';
import { readFileSync } from 'fs';
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
//
//
export function startup_expressServer(
    app: Express,
    db: MongoClient,
    http_port: number,
    https_port: number,
    isInDev: boolean
) {
    //
    // console.log('setting');
    setupLogging(app, isInDev);
    setupRendering(app);

    app.set('trust proxy', 1);
    setupRequestParser(app);
    //
    // serving static files and
    // prevent webpage from showing in search engine
    loadPreMiddleware(app, db);
    // console.log('setting');
    //
    initiateDatabaseInterface(db, 'Express' + (isInDev ? '_dev' : ''));
    //
    serveStatic(app);
    //
    // console.log('setting');
    setupRouter(app);
    //
    loadErrorHandlerMiddleware(app);

    // app.listen(port, function () {
    //     CLL.log(threadName, 'Express Startup', `Running on port ${port}`);
    // });
    CLL.log(threadName, 'Express Startup', 'Loading key');
    const https_options = {
        key: readFileSync(process.env.HTTPS_KEY as string),
        cert: readFileSync(process.env.HTTPS_CERT as string),
        ca: readFileSync(process.env.HTTPS_CA as string),
    };
    createServer_http(app).listen(http_port);
    CLL.log(threadName, 'Express Startup', `Running http on port ${http_port}`);
    createServer_https(https_options, app).listen(https_port);
    CLL.log(
        threadName,
        'Express Startup',
        `Running https on port ${https_port}`
    );
}
