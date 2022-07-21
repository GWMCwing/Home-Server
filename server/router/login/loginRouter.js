const { RouterBuilder } = require('../routerFactory');
const { loginRendererCallback } = require('../../render/login/loginRenderer');
const {
    earlyLoginMiddleware,
} = require('../../middleware/authentication/authSession');
const { loginAuth } = require('./login');
function loginRouter() {
    return new RouterBuilder()
        .setPath('/login')
        .addMiddleware(earlyLoginMiddleware)
        .addGetRequest('/', loginRendererCallback)
        .addGetRequest('/auth', loginAuth)
        .build();
}
module.exports = { loginRouter };
