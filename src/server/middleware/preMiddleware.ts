import { Application } from 'express';
import helmet from 'helmet';
import { MongoClient } from 'mongodb';
import { config } from '../../config/config';
import { CLL } from '../util/consoleLogging';

import { preventCrawler } from './crawler/preventCrawler';
import { commonHeader } from './header/commonHeader';

export function loadPreMiddleware(app: Application, db: MongoClient) {
    // redirect http request to https
    app.use(preventCrawler);
    app.use(commonHeader);
    app.use(helmet());
    app.use((req, res, next) => {
        if (req.secure) next();
        else {
            CLL.log(
                'Middleware',
                'Redirection',
                'Redirected from http to https'
            );
            res.redirect(
                'https://' + req.hostname + ':' + config.https_port + req.url
            );
        }
    });
}
