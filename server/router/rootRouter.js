const { UserCollection } = require('../database/dataBase');
const {
    homepageRendererCallback,
} = require('../render/homepage/homepageRenderer');
const userManager = require('../user/userManager');
const { loginRouter } = require('./login/loginRouter');
const { dashboardRouter } = require('./dashboard/dashboardRouter');
const { hash } = require('../util/common');
async function wap(name, callback) {
    let user = await UserCollection.getInstance().findDocument({ name: name });
    console.log(user);
}
function setupRouter(app) {
    // basic root get
    app.get('/', homepageRendererCallback);
    // router for all sub path
    app.use(...loginRouter());
    app.use(...dashboardRouter());
    if (process.env.NODE_ENV === 'development') {
        console.warn('Using non production methods in rootRouter');
        app.get('/createLogin', (req, res) => {
            let { name, password } = req.query;
            hash({ password: password }, function (err, pass, salt, hash) {
                userManager
                    .createUser(name, hash, salt)
                    .catch((err) => {
                        console.log(err);
                        res.status(401);
                        res.end();
                    })
                    .then((user) => {
                        res.end();
                    });
            });
        });
    }
}
module.exports = { setupRouter };
