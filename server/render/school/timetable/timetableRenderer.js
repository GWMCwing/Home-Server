const { availableSchool } = require('../../../util/common');
const path = require('path');
const { viewPath } = require('../../../util/common');
const { generateNavBarItemList } = require('../../navBar/navBarGenerator');
const { CourseCollection } = require('../../../database/dataBase');
async function timetableRendererCallback(req, res) {
    const schoolName = req.params.schoolName;
    if (!availableSchool.includes(schoolName)) {
        res.redirect('../timetable');
        return;
    }
    const deptList = await CourseCollection.getInstance().distinct('dept', {
        semester: '2210',
        school: schoolName,
    });
    const pugObject = {
        schoolName: schoolName,
        deptList: deptList,
        navBarList: generateNavBarItemList(req),
    };
    res.render(
        path.join(viewPath, 'school', 'timetable', 'timetable.pug'),
        pugObject
    );
}
module.exports = { timetableRendererCallback };
