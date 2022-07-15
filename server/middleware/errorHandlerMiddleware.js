const { errorHandler, serveErrorPage } = require('./error/errorHandler');
function errorHandlerMiddleware(app) {
    app.use(serveErrorPage);
    app.use(errorHandler);
}

module.exports = { errorHandlerMiddleware };
