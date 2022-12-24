// require('dotenv').config();
import { config } from 'dotenv';
config();
import express from 'express';
import { MongoClient } from 'mongodb';
const app = express();
//
import { port, mongodbUrl } from './server/util/common';
import { CLL } from './server/util/consoleLogging';
import { startup_expressServer } from './server/startup/expressServerSetup';
import { startup_internalHandler } from './server/startup/internalHandler';
import { fetchAndUpdateCourseList_HKUST } from './server/tasks/courseList/fetchCourseList_HKUST';
// ---------- end of import ---------------
const threadName = 'MAIN';
//
const targetMongoUrl =
    process.env.CONNECTION_TARGET === 'CLOUD'
        ? (process.env.MONGODB_CLOUD_SSL as string)
        : mongodbUrl;
//
CLL.log(threadName, 'Internal', 'Starting up internal handler...');
startup_internalHandler();
//
CLL.log(
    threadName,
    'MongoDb',
    `Connecting to MongoDb... (${process.env.CONNECTION_TARGET})`
);
MongoClient.connect(targetMongoUrl, function (err, db) {
    if (err) throw err;
    CLL.log(threadName, 'Mongodb', 'Connected to Mongodb');
    const isInDev = process.env.NODE_ENV === 'development';
    startup_expressServer(app, db as MongoClient, port, isInDev);
    fetchAndUpdateCourseList_HKUST();
});
