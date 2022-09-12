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
async function courseQuery(req, res) {
    const dept = req.query.dept;
    const id = req.query.id;
    const school = req.query.school;
    if (dept === undefined || id === undefined || school === undefined) {
        res.json({ error: true });
        return;
    }
    const course = await CourseCollection.getInstance().findOneDoc(
        {
            dept: dept,
            id: id,
            school: school,
        },
        {
            projection: {
                _id: 0,
            },
        }
    );
    if (course === null) {
        res.json({ error: true });
        return;
    }
    res.json({ error: false, course: course });
}
function courseList_API_Router() {
    return new RouterBuilder()
        .setPath('/')
        .addGetRequest('/course', courseQuery)
        .addGetRequest('/courseList', courseListQuery)
        .build();
}
module.exports = { courseList_API_Router };
