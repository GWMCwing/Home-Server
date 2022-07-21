const { RouterBuilder } = require('../routerFactory');
const {
    homepageRendererCallback,
} = require('../../render/homepage/homepageRender');
function homepageRouter() {
    return new RouterBuilder()
        .setPath('/')
        .addGetRequest('/', homepageRendererCallback)
        .build();
}
module.exports = { homepageRouter };
