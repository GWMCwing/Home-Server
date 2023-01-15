import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
export function helmetHeader() {
    return helmet({
        contentSecurityPolicy: {
            directives: {
                'default-src': 'https: ws:',
                'script-src': null,
                'img-src': null,
            },
        },
        crossOriginEmbedderPolicy: {
            policy: 'credentialless',
        },
    });
}
export function commonHeader(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    next();
}
// https://developers.google.com/search/docs/advanced/crawling/block-indexing
export function preventCrawler(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    res.set('X-Robots-Tag', 'none');
    next();
}
