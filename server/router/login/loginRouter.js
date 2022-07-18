const { RouterFactory } = require('../routerFactory');
const { loginRendererCallback } = require('../../render/login/loginRenderer');
function loginRouter() {
    return new RouterFactory()
        .setPath('/login')
        .addGetRequest('/', loginRendererCallback)
        .build();
}
module.exports = { loginRouter };
