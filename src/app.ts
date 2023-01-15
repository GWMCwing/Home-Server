// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import express from 'express';
import { MongoClient } from 'mongodb';
const app = express();
//
import { config } from './config/config';
import { CLL } from './server/util/consoleLogging';
import { startup_expressServer } from './server/startup/expressServerSetup';
import { startup_internalHandler } from './server/startup/internalHandler';
import { fetchAndUpdateCourseList_HKUST } from './server/tasks/courseList/fetchCourseList_HKUST';
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
    startup_expressServer(
        app,
        db,
        config.http_port,
        config.https_port,
        isInDev
    );
    fetchAndUpdateCourseList_HKUST();
}
//
main().catch((err) => CLL.error(threadName, 'Main', err));
