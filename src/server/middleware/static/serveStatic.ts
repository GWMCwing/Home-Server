import express, { Application } from 'express';

// import { cssPath, publicJSPath, htmlStructurePath } from '../../util/common';
import { config } from '../../../config/config';

export function serveStatic(app: Application) {
    app.use('/resource/css', express.static(config.cssPath));
    app.use('/resource/javascript', express.static(config.publicJSPath));
    app.use('/resource/html', express.static(config.htmlStructurePath));
}
