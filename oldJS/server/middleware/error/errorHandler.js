const path = require('path');
const { errorPath } = require('./../../util/common');

function serveErrorPage(req, res, next) {
    res.status(404);
    res.format({
        html: function () {
            res.render(path.join(errorPath, 'error404.pug'));
        },
        json: function () {
            res.json({ error: 'Not found' });
        },
        default: function () {
            res.type('txt').send('Not found');
        },
    });
}

function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(err.status || 500);
    if (err.status === 500) res.render(path.join(errorPath, 'error500.pug'));
    //TODO general Error page
    res.render(path.join(errorPath, 'error500.pug'));
}

module.exports = { serveErrorPage, errorHandler };
