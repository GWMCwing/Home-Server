const { preventCrawler } = require('./crawler/preventCrawler');
function preMiddleware(app, db) {
    app.use(preventCrawler);
}

module.exports = { preMiddleware };
