import { Request, Response, NextFunction } from 'express';
// https://developers.google.com/search/docs/advanced/crawling/block-indexing
export function preventCrawler(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    res.set('X-Robots-Tag', 'none');
    next();
}
