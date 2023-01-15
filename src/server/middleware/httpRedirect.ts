import { Request, Response, NextFunction } from 'express';
import { config } from '../../config/config';
import { CLL } from '../util/consoleLogging';
export function httpRedirect(req: Request, res: Response, next: NextFunction) {
    if (req.secure) next();
    else {
        CLL.log('Middleware', 'Redirection', 'Redirected from http to https');
        res.redirect(
            'https://' + req.hostname + ':' + config.https_port + req.url
        );
    }
}
