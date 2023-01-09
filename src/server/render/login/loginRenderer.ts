import { Request, Response } from 'express';
import path from 'path';
import { config } from '../../../config/config';
import { generateNavBarItemList } from '../navBar/navBarGenerator';
export function loginRendererCallback(req: Request, res: Response) {
    const pugObject = {
        navBarList: generateNavBarItemList(req),
    };
    res.render(path.join(config.viewPath, 'login', 'login.pug'), pugObject);
}
