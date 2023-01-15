import { Application } from 'express';
import { MongoClient } from 'mongodb';
import { httpRedirect } from './httpRedirect';
import {
    commonHeader,
    preventCrawler,
    helmetHeader,
} from './header/commonHeader';

export function loadPreMiddleware(app: Application, db: MongoClient) {
    // redirect http request to https
    app.use(preventCrawler);
    app.use(commonHeader);
    app.use(helmetHeader());
    app.use(httpRedirect);
}
