const path = require('path');
const { UserCollection } = require('../../database/dataBase');
const { viewPath } = require('../../util/common');
const { generateNavBarItemList } = require('../navBar/navBarGenerator');
async function dashboardRenderer(req, res) {
    // TODO get from req, should be included when auth middleware auth successfully
    const user = await UserCollection.getInstance().findDocument({
        loginToken: req.cookies.loginToken,
    });
    //TODO redirect to unknown???
    if (!user) return res.redirect('/login');
    let pugObject = {
        navBarList: generateNavBarItemList(req),
        userName: user.name,
    };
    res.render(path.join(viewPath, 'dashboard', 'dashboard.pug'), pugObject);
}
module.exports = { dashboardRenderer };
