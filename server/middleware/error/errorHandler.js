const path = require('path');
const { errorPath } = require('./../../util/common');

function serveErrorPage(req, res, next) {
    res.status(404);
    res.format({
        html: function () {
            res.sendFile(path.join(errorPath, 'error404.html'));
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
    res.status(err.status || 500);
    if (err.status === 500) res.sendFile(path.join(errorPath, 'error500.html'));
    //TODO general Error page
    res.sendFile(path.join(errorPath, 'error500.html'));
}

module.exports = { serveErrorPage, errorHandler };
