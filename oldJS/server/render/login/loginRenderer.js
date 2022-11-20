const path = require('path');
const { viewPath } = require('../../util/common');
const { generateNavBarItemList } = require('../navBar/navBarGenerator');
function loginRendererCallback(req, res) {
    let pugObject = {
        navBarList: generateNavBarItemList(req),
    };
    res.render(path.join(viewPath, 'login', 'login.pug'), pugObject);
}
module.exports = { loginRendererCallback };
