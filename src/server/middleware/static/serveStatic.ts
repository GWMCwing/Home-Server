//TODO allow static serving for favicon.ico, logo192.png, logo512.png, robots.txt(?)
import express, { Application } from 'express';
import { readdirSync } from 'fs';
import path from 'path';

// import { cssPath, publicJSPath, htmlStructurePath } from '../../util/common';
import { config } from '../../../config/config';

function serveReactStatic(app: Application) {
    const dirEnt = readdirSync(config.reactPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) =>
            path.join(
                config.reactPath,
                dirent.name,
                'resource',
                'react',
                dirent.name,
                'static'
            )
        );

    for (const dir of dirEnt) {
        const pathList = dir.split('/');
        const name = pathList[pathList.length - 2];
        const staticPath = `/resource/react/${name}/static`;
        //* Map: /resource/react/geneticAlgo/static ___to___ $PWD/bin/client/react/geneticAlgo/resource/react/geneticAlgo/static
        // console.log('Map:', staticPath, '___to___', dir);
        app.use(staticPath, express.static(dir));
    }
}

export function serveStatic(app: Application) {
    app.use('/resource/css', express.static(config.cssPath));
    app.use('/resource/javascript', express.static(config.publicJSPath));
    app.use('/resource/html', express.static(config.htmlStructurePath));
    // serve react static
    serveReactStatic(app);
}
