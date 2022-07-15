const { serveStatic } = require('./static/serveStatic');
const { preventCrawler } = require('./crawler/preventCrawler');
function preMiddleware(app) {
    app.use(preventCrawler);
    serveStatic(app);
}

module.exports = { preMiddleware };
