const path = require('path');
const { viewPath } = require('../../../util/common');
const { generateNavBarItemList } = require('../../navBar/navBarGenerator');
function timetableRendererCallback(req, res) {
    let pugObject = {
        navBarList: generateNavBarItemList(req),
    };
    res.render(
        path.join(viewPath, 'school', 'timetable', 'timetable.pug'),
        pugObject
    );
}
module.exports = { timetableRendererCallback };
