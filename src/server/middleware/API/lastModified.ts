import { NextFunction, Request, Response } from 'express';

export function lastModified(req: Request, res: Response, next: NextFunction) {
    res.setHeader('Last-Modified', new Date().toUTCString());
    next();
}
