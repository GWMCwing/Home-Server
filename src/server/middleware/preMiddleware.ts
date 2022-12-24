import { Application } from 'express';
import { MongoClient } from 'mongodb';

import { preventCrawler } from './crawler/preventCrawler';

export function loadPreMiddleware(app: Application, db: MongoClient) {
    app.use(preventCrawler);
}
