const { RouterFactory } = require('../routerFactory');
const {
    homepageRendererCallback,
} = require('../../render/homepage/homepageRender');
function homepageRouter() {
    return new RouterFactory()
        .setPath('/')
        .addGetRequest('/', homepageRendererCallback)
        .build();
}
module.exports = { homepageRouter };
