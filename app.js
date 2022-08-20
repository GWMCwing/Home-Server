require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
//
const { port, mongodbUrl } = require('./server/util/common');
//
const { preMiddleware } = require('./server/middleware/preMiddleware');
const { initiateDatabaseInterface } = require('./server/database/dataBase');
const {
    errorHandlerMiddleware,
} = require('./server/middleware/errorHandlerMiddleware');
const { setupRouter } = require('./server/router/rootRouter');
const { serveStatic } = require('./server/middleware/static/serveStatic');
// ---------- end of import ---------------
//
MongoClient.connect(mongodbUrl, function (err, db) {
    if (err) throw err;
    console.log('Connected to Mongodb');
    if (process.env.NODE_ENV === 'development') {
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
    initiateDatabaseInterface(db);
    serveStatic(app);
    //
    setupRouter(app);
    //
    errorHandlerMiddleware(app);
    app.listen(port, function () {
        console.log(`Running on port ${port}`);
    });
    const {
        fetchAndUpdateCourseList,
    } = require('./server/tasks/courseList/fetchCourseList');
    fetchAndUpdateCourseList();
});
