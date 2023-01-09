import { Request, Response } from 'express';

import { SchoolList } from '../../../util/common';
import path from 'path';
import { config } from '../../../../config/config';
export async function timetableSelectorRendererCallback(
    req: Request,
    res: Response
) {
    const pugObject = {
        availableSchool: SchoolList,
    };
    res.render(
        path.join(
            config.viewPath,
            'school',
            'timetable',
            'timetableSelector.pug'
        ),
        pugObject
    );
}
