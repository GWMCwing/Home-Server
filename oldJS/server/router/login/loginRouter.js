const { RouterBuilder } = require('../routerBuilder');
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
        .addPostRequest('/auth', loginAuth)
        .addGetRequest('/auth', (req, res) => {
            res.redirect('/login');
        })
        .build();
}
module.exports = { loginRouter };
