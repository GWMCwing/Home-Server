// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import express from 'express';
import { MongoClient } from 'mongodb';
const app = express();
//
import { config } from './config/config';
import { CLL } from './server/util/consoleLogging';
import { setup_expressServer } from './server/startup/expressServerSetup';
import { startup_internalHandler } from './server/startup/internalHandler';
import { fetchAndUpdateCourseList_HKUST } from './server/tasks/courseList/fetchCourseList_HKUST';
import { setup_webSocketServer } from './server/startup/websocketServerSetup';
// ---------- end of import ---------------
const threadName = 'MAIN';
//
//
const targetMongoUrl =
    process.env.CONNECTION_TARGET === 'REMOTE'
        ? (process.env.MONGODB_REMOTE_SSL as string)
        : config.mongodbUrl;
//
CLL.log(threadName, 'Internal', 'Starting up internal handler...');
startup_internalHandler();
//
CLL.log(
    threadName,
    'MongoDb',
    `Connecting to MongoDb... (${process.env.CONNECTION_TARGET})`
);
async function main() {
    const db = await MongoClient.connect(targetMongoUrl).catch((err) => {
        CLL.error(threadName, 'Mongodb', err);
        throw new Error('Cannot Connect to Mongodb');
    });
    const isInDev = process.env.NODE_ENV === 'development';

    CLL.log(
        threadName,
        'Process',
        'Running as ' + (isInDev ? 'Development' : 'Production') + ' Mode'
    );
    CLL.log(threadName, 'Mongodb', 'Connected to Mongodb');
    const { httpServer, httpsServer } = setup_expressServer(app, db, isInDev);
    //
    setup_webSocketServer(httpsServer, isInDev);
    //
    httpServer.listen(config.http_port);
    CLL.log(
        threadName,
        'Express Startup',
        `Running http on port ${config.http_port}`
    );
    httpsServer.listen(config.https_port);
    CLL.log(
        threadName,
        'Express Startup',
        `Running https on port ${config.https_port}`
    );

    //
    fetchAndUpdateCourseList_HKUST();
}
//
main().catch((err) => CLL.error(threadName, 'Main', err));
