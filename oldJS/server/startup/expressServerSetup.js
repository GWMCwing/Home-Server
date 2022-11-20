const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { loadPreMiddleware } = require('../middleware/preMiddleware');
const { CLL } = require('../util/consoleLogging');
const { initiateDatabaseInterface } = require('../database/dataBase');
const { serveStatic } = require('../middleware/static/serveStatic');
const { setupRouter } = require('../router/rootRouter');
const { loadErrorHandlerMiddleware } = require('../middleware/errorHandlerMiddleware');
//
const threadName = 'Main';
//
function setupLogging(app, isInDev) {
    if (isInDev) {
        app.use(morgan('dev'));
    } else {
        app.use(morgan('combined'));
    }
}
function setupRendering(app) {
    app.set('view engine', 'pug');
}
function setupRequestParser(app) {
    app.use(cookieParser());
}
function startup_expressServer(app, db, port, isInDev) {
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

module.exports = { startup_expressServer };
