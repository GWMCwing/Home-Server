import { Request, Response, NextFunction } from 'express';
export function commonHeader(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    next();
}
