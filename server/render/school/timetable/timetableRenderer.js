const path = require('path');
const { viewPath } = require('../../../util/common');
const { generateNavBarItemList } = require('../../navBar/navBarGenerator');
const { CourseCollection } = require('../../../database/dataBase');
async function timetableRendererCallback(req, res) {
    const deptList = await CourseCollection.getInstance().distinct('dept', {
        semester: '2210',
    });
    let pugObject = {
        deptList: deptList,
        navBarList: generateNavBarItemList(req),
    };
    res.render(
        path.join(viewPath, 'school', 'timetable', 'timetable.pug'),
        pugObject
    );
}
module.exports = { timetableRendererCallback };
