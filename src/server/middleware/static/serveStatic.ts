import express, { Application } from 'express';
import { readdir, readdirSync } from 'fs';
import path from 'path';

// import { cssPath, publicJSPath, htmlStructurePath } from '../../util/common';
import { config } from '../../../config/config';
import { CLL } from '../../util/consoleLogging';

const threadName = 'Express-startup';

function serveReactStatic(app: Application) {
    const dirEnt = readdirSync(config.reactPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => path.join(config.reactPath, dirent.name));
    for (const dir in dirEnt) {
        const name = dir.slice(dir.lastIndexOf('/') + 1);
        app.use(`/resource/${name}`, express.static(dir));
    }
}

export function serveStatic(app: Application) {
    app.use('/resource/css', express.static(config.cssPath));
    app.use('/resource/javascript', express.static(config.publicJSPath));
    app.use('/resource/html', express.static(config.htmlStructurePath));
    // serve react static
    serveReactStatic(app);
}
