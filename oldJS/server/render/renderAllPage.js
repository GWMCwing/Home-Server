const { homepageRenderer } = require('./homepage/homepageRender');

//
function renderPage(app) {
    homepageRenderer(app)();
}
function renderEasterEggPage(app) {}
//
module.exports = { renderPage, renderEasterEggPage };
