require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
//
const {
    port,
    mongodbUrl,
    mongodbUrl_Cloud_SSL,
} = require('./server/util/common');
//
const { preMiddleware } = require('./server/middleware/preMiddleware');
const { initiateDatabaseInterface } = require('./server/database/dataBase');
const {
    errorHandlerMiddleware,
} = require('./server/middleware/errorHandlerMiddleware');
const { setupRouter } = require('./server/router/rootRouter');
const { serveStatic } = require('./server/middleware/static/serveStatic');
const { CLL } = require('./server/util/consoleLogging');
const {
    fetchAndUpdateCourseList_HKUST,
} = require('./server/tasks/courseList/fetchCourseList_HKUST');
// ---------- end of import ---------------
const threadName = 'MAIN';
//
const targetMongoUrl =
    process.env.CONNECTION_TARGET === 'CLOUD'
        ? mongodbUrl_Cloud_SSL
        : mongodbUrl;
//
CLL.log(
    threadName,
    'MongoDb',
    `Connecting to MongoDb... (${process.env.CONNECTION_TARGET})`
);
MongoClient.connect(targetMongoUrl, function (err, db) {
    if (err) throw err;
    CLL.log(threadName, 'Mongodb', 'Connected to Mongodb');
    let isInDev = process.env.NODE_ENV === 'development';
    if (isInDev) {
        app.use(morgan('dev'));
    } else {
        app.use(morgan('combined'));
    }
    app.set('trust proxy', 1);
    app.set('view engine', 'pug');
    app.use(cookieParser());
    //
    // serving static files and
    // prevent webpage from showing in search engine
    preMiddleware(app, db);
    initiateDatabaseInterface(db, 'expressServer' + (isInDev ? '_dev' : ''));
    serveStatic(app);
    //
    setupRouter(app);
    //
    errorHandlerMiddleware(app);
    app.listen(port, function () {
        CLL.log(threadName, 'Express', `Running on port ${port}`);
    });
    fetchAndUpdateCourseList_HKUST();
});
//
process.on('SIGINT', function () {
    CLL.log(threadName, 'PROCESS', 'Caught interrupt signal');
    const i_should_exit = true;
    if (i_should_exit) process.exit();
});
