import { NextFunction, Request, Response } from 'express';
import path from 'path';
import { config } from '../../../config/config';
const errorPath = config.errorPath;

export function serveErrorPage(
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.status(404);
    res.format({
        html: function () {
            res.render(path.join(errorPath, 'error404.pug'));
        },
        json: function () {
            res.json({ error: 'Not found' });
        },
        default: function () {
            res.type('txt').send('Not found');
        },
    });
}

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err);
    res.status(err.status || 500);
    if (err.status === 500) res.render(path.join(errorPath, 'error500.pug'));
    //TODO general Error page
    res.render(path.join(errorPath, 'error500.pug'));
}
