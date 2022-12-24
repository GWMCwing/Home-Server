import express, { Application } from 'express';

import { cssPath, publicJSPath, htmlStructurePath } from '../../util/common';

export function serveStatic(app: Application) {
    app.use('/resource/css', express.static(cssPath));
    app.use('/resource/javascript', express.static(publicJSPath));
    app.use('/resource/html', express.static(htmlStructurePath));
}
