const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
//
const { port } = require('./server/util/common');
//
const { preMiddleware } = require('./server/middleware/preMiddleware');
const {
    errorHandlerMiddleware,
} = require('./server/middleware/errorHandlerMiddleware');
const { setupRouter } = require('./server/router/rootRouter');
const { serveStatic } = require('./server/middleware/static/serveStatic');
// ---------- end of import ---------------
//
if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
} else {
    app.use(morgan('dev'));
}
app.set('view engine', 'pug');
app.use(cookieParser());
//
// serving static files and
// prevent webpage from showing in search engine
preMiddleware(app);
serveStatic(app);
//
setupRouter(app);
//
errorHandlerMiddleware(app);
//
app.listen(port, function () {
    console.log(`Running on port ${port}`);
});
