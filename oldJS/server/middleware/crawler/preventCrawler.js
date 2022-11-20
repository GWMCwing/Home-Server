// https://developers.google.com/search/docs/advanced/crawling/block-indexing
function preventCrawler(req, res, next) {
    res.set('X-Robots-Tag', 'none');
    next();
}

module.exports = { preventCrawler };
