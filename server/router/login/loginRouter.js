const { RouterBuilder } = require('../routerFactory');
const { loginRendererCallback } = require('../../render/login/loginRenderer');
const { loginAuth } = require('./login');
function loginRouter() {
    return new RouterBuilder()
        .setPath('/login')
        .addGetRequest('/', loginRendererCallback)
        .addGetRequest('/auth', loginAuth)
        .build();
}
module.exports = { loginRouter };
