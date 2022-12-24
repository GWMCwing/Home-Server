import { Request, Response } from 'express';
import path from 'path';
import { viewPath } from '../../util/common';
import { generateNavBarItemList } from '../navBar/navBarGenerator';
export function loginRendererCallback(req: Request, res: Response) {
    const pugObject = {
        navBarList: generateNavBarItemList(req),
    };
    res.render(path.join(viewPath, 'login', 'login.pug'), pugObject);
}
