const { errorHandler, serveErrorPage } = require('./error/errorHandler');
function loadErrorHandlerMiddleware(app) {
    app.use(serveErrorPage);
    app.use(errorHandler);
}

module.exports = { loadErrorHandlerMiddleware };
