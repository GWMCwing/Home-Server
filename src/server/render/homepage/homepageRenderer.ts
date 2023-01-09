import path from 'path';
import { Request, Response } from 'express';
import { generateNavBarItemList } from '../navBar/navBarGenerator';
import { config } from '../../../config/config';
export function homepageRendererCallback(req: Request, res: Response) {
    const pugObject = {
        navBarList: generateNavBarItemList(req),
    };
    res.render(
        path.join(config.viewPath, 'homepage', 'homepage.pug'),
        pugObject
    );
}
