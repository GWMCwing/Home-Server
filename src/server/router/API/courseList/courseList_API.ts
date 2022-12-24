import { RouterBuilder } from '../../routerBuilder';
import { courseCollection } from '../../../database/databaseInterface';
import { Request, Response } from 'express';
async function courseListQuery(req: Request, res: Response) {
    const dept = req.query.dept;
    const semester = req.query.semester;
    const school = req.query.school;
    if (dept === undefined || semester === undefined || school === undefined) {
        res.status(400).json({ error: true });
        return;
    }
    const courseListCursor = await courseCollection.findMultipleDoc(
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
    for await (const course of courseListCursor) {
        courseListRes.push(course);
    }
    if (courseListRes.length === 0) {
        res.status(400).json({ error: true });
        return;
    }
    res.status(200).json({ error: false, list: [...courseListRes] });
}
async function courseQuery(req: Request, res: Response) {
    const dept = req.query.dept;
    const id = req.query.id;
    const school = req.query.school;
    if (dept === undefined || id === undefined || school === undefined) {
        res.status(400).json({ error: true });
        return;
    }
    const course = await courseCollection.findDocument(
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
        res.status(400).json({ error: true });
        return;
    }
    res.status(200).json({ error: false, course: course });
}
export function courseList_API_Router() {
    return new RouterBuilder()
        .setPath('/')
        .addGetRequest('/course', courseQuery)
        .addGetRequest('/courseList', courseListQuery)
        .build();
}
