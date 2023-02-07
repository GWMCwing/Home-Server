import { NextFunction, Request, Response } from 'express';

export function redirectReactStatic(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // const pathList = req.path.split('/');
    // if (pathList[1] !== 'react') next();
    // //
    // const appName = pathList[2];
    // res.redirect()
}
