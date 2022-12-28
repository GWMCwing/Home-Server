import { SchoolList } from '../../../util/common';
import path from 'path';
import { viewPath } from '../../../util/common';
import { generateNavBarItemList } from '../../navBar/navBarGenerator';
import { courseCollection } from '../../../database/databaseInterface';
import { Request, Response } from 'express';
//
const semester = '2220';
//
export async function timetableRendererCallback(req: Request, res: Response) {
    const schoolName = req.params.schoolName;
    if (!SchoolList.includes(schoolName)) {
        res.redirect('../timetable');
        return;
    }
    const deptList = await courseCollection.distinct('dept', {
        semester: '2220',
        school: schoolName,
    });
    const pugObject = {
        schoolName: schoolName,
        school: schoolName,
        semester: semester,
        deptList: deptList,
        navBarList: generateNavBarItemList(req),
    };
    res.render(
        path.join(viewPath, 'school', 'timetable', 'timetable.pug'),
        pugObject
    );
}
