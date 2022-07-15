const path = require('path');
const express = require('express');
const logger = require('morgan');
const app = express();
//
const { port, viewPath } = require('./server/util/common');
//
const { preMiddleware } = require('./server/middleware/preMiddleware');
const {
    errorHandlerMiddleware,
} = require('./server/middleware/errorHandlerMiddleware');
//
app.use(logger('dev'));
//
// serving static files and
// prevent webpage from showing in search engine
preMiddleware(app);
//
app.get('/', function (req, res) {
    res.sendFile(path.join(viewPath, 'homepage', 'homepage.html'));
});
//
// error testing
// const { testError } = require('./server/middleware/error/errorTest');
// testError(app, '500')();
//
errorHandlerMiddleware(app);
//
app.listen(port, function () {
    console.log(`Running on port ${port}`);
});
