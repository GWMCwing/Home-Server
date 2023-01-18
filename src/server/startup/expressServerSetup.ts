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
import {
    createServer as createServer_http,
    IncomingMessage,
    Server,
    ServerResponse,
} from 'http';
import { createServer as createServer_https } from 'https';
import { MongoClient } from 'mongodb';
import { readFileSync } from 'fs';
//
const threadName = 'Main';
const morgan_dateTimeFormatter = new Intl.DateTimeFormat([], {
    timeZone: 'Asia/Hong_Kong',
    hour12: false,
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    fractionalSecondDigits: 3,
});
//
function morganSetup() {
    morgan.token('date', function () {
        const f2 = morgan_dateTimeFormatter
            .formatToParts(new Date())
            .filter((v) => {
                return v.type != 'literal';
            });
        // console.log(f2);
        const f3: Record<string, string> = {};
        for (let i = 0; i < f2.length; i++) {
            f3[f2[i].type] = f2[i].value;
        }
        return `${f3.day}/${f3.month}/${f3.year}-${f3.hour}:${f3.minute}:${f3.second}`;
    });
}
//
function setupLogging(app: Express, isInDev: boolean) {
    //
    morganSetup();
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
export function setup_expressServer(
    app: Express,
    db: MongoClient,
    isInDev: boolean
): {
    httpServer: Server<typeof IncomingMessage, typeof ServerResponse>;
    httpsServer: Server<typeof IncomingMessage, typeof ServerResponse>;
} {
    //
    // console.log('setting');
    setupLogging(app, isInDev);
    //
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
    //
    CLL.log(threadName, 'Express Startup', 'Loading key');
    const https_options = {
        key: readFileSync(process.env.HTTPS_KEY as string),
        cert: readFileSync(process.env.HTTPS_CERT as string),
        ca: readFileSync(process.env.HTTPS_CA as string),
    };
    const httpServer = createServer_http(app);
    const httpsServer = createServer_https(https_options, app);
    return { httpServer: httpServer, httpsServer: httpsServer };
}
