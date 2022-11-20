require('dotenv').config();
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
//
const { port, mongodbUrl } = require('./server/util/common');
const { CLL } = require('./server/util/consoleLogging');
const { startup_expressServer } = require('./server/startup/expressServerSetup');
const { startup_internalHandler } = require('./server/startup/internalHandler');
const { fetchAndUpdateCourseList_HKUST } = require('./server/tasks/courseList/fetchCourseList_HKUST');
// ---------- end of import ---------------
const threadName = 'MAIN';
//
const targetMongoUrl = process.env.CONNECTION_TARGET === 'CLOUD' ? process.env.MONGODB_CLOUD_SSL : mongodbUrl;
//
CLL.log(threadName, 'Internal', 'Starting up internal handler...');
startup_internalHandler();
//
CLL.log(threadName, 'MongoDb', `Connecting to MongoDb... (${process.env.CONNECTION_TARGET})`);
MongoClient.connect(targetMongoUrl, function (err, db) {
    if (err) throw err;
    CLL.log(threadName, 'Mongodb', 'Connected to Mongodb');
    let isInDev = process.env.NODE_ENV === 'development';
    startup_expressServer(app, db, port, isInDev);
    fetchAndUpdateCourseList_HKUST();
});
