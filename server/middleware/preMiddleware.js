const { preventCrawler } = require('./crawler/preventCrawler');
function loadPreMiddleware(app, db) {
    app.use(preventCrawler);
}

module.exports = { loadPreMiddleware };
