import { Request, Response } from 'express';

import { SchoolList } from '../../../util/common';
import path from 'path';
import { viewPath } from '../../../util/common';
export async function timetableSelectorRendererCallback(
    req: Request,
    res: Response
) {
    const pugObject = {
        availableSchool: SchoolList,
    };
    res.render(
        path.join(viewPath, 'school', 'timetable', 'timetableSelector.pug'),
        pugObject
    );
}
