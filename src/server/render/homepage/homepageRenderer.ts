import path from 'path';
import { Request, Response } from 'express';
import { viewPath } from '../../util/common';
import { generateNavBarItemList } from '../navBar/navBarGenerator';
export function homepageRendererCallback(req: Request, res: Response) {
    const pugObject = {
        navBarList: generateNavBarItemList(req),
    };
    res.render(path.join(viewPath, 'homepage', 'homepage.pug'), pugObject);
}
