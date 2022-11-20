const { RouterBuilder } = require('../routerBuilder');
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
