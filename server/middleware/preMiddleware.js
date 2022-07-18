const { preventCrawler } = require('./crawler/preventCrawler');
function preMiddleware(app) {
    app.use(preventCrawler);
}

module.exports = { preMiddleware };
