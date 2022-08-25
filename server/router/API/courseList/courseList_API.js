const { RouterBuilder } = require('../../routerBuilder');
const { CourseCollection } = require('../../../database/dataBase');
async function courseListQuery(req, res) {
    const dept = req.query.dept;
    const semester = req.query.semester;
    const school = req.query.school;
    if (dept === undefined || semester === undefined || school === undefined) {
        res.json({ error: true });
        return;
    }
    const courseListCursor =
        await CourseCollection.getInstance().findMultipleDoc(
            {
                dept: dept,
                semester: semester,
                school: school,
            },
            {
                sort: { id: 1 },
                projection: {
                    _id: 0,
                },
            }
        );
    const courseListRes = [];
    await courseListCursor.forEach((course, i) => {
        // console.log(JSON.stringify(course));
        courseListRes.push(course);
    });
    if (courseListRes.length === 0) {
        res.json({ error: true });
        return;
    }
    res.json({ error: false, list: [...courseListRes] });
}
function courseList_API_Router() {
    return new RouterBuilder()
        .setPath('/courseList')
        .addGetRequest('/', courseListQuery)
        .build();
}
module.exports = { courseList_API_Router };
