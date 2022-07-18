const path = require('path');
const { viewPath } = require('../../util/common');
const { generateNavBarItemList } = require('../navBar/navBarGenerator');
function homepageRendererCallback(req, res) {
    let pugObject = {
        navBarList: generateNavBarItemList(req),
    };
    res.render(path.join(viewPath, 'homepage', 'homepage.pug'), pugObject);
}
module.exports = { homepageRendererCallback };
