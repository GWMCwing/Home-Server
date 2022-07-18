const {
    homepageRendererCallback,
} = require('../render/homepage/homepageRenderer');
const { loginRouter } = require('./login/loginRouter');
function setupRouter(app) {
    // basic root get
    app.get('/', homepageRendererCallback);
    // router for all sub path
    app.use(...loginRouter());
}
module.exports = { setupRouter };
