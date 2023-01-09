import { SchoolList } from '../../../util/common';
import path from 'path';
import { generateNavBarItemList } from '../../navBar/navBarGenerator';
import { courseCollection } from '../../../database/databaseInterface';
import { Request, Response } from 'express';
import { config } from '../../../../config/config';
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
        path.join(config.viewPath, 'school', 'timetable', 'timetable.pug'),
        pugObject
    );
}
