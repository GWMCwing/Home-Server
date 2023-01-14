// server side configuration
//
import path from 'path';
// import again to prevent out of order import
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
//
interface Config {
    port: number;
    mongodbUrl: string; // production same as development
    viewPath: string;
    cssPath: string;
    publicJSPath: string;
    htmlStructurePath: string;
    errorPath: string;
    semester: string;
}
const rootPath: string = path.join(__dirname, '..', '..');
//
const config_prod: Config = {
    port: 80,
    mongodbUrl: 'mongodb://localhost:27017', // same as development
    viewPath: path.join(rootPath, 'bin', 'client', 'html', 'view'),
    cssPath: path.join(rootPath, 'bin', 'client', 'static', 'css'),
    publicJSPath: path.join(rootPath, 'bin', 'client', 'static', 'javascript'),
    htmlStructurePath: path.join(
        rootPath,
        'bin',
        'client',
        'static',
        'html',
        'structure'
    ),
    errorPath: path.join(rootPath, 'bin', 'client', 'html', 'error'),
    semester: '2230',
} as const;
//
const config_dev: Config = {
    port: 80,
    mongodbUrl: 'mongodb://localhost:27017',
    viewPath: path.join(rootPath, 'src', 'client', 'html', 'view'),
    cssPath: path.join(rootPath, 'src', 'client', 'static', 'css'),
    publicJSPath: path.join(rootPath, 'bin', 'client', 'static', 'javascript'),
    htmlStructurePath: path.join(
        rootPath,
        'src',
        'client',
        'static',
        'html',
        'structure'
    ),
    errorPath: path.join(rootPath, 'src', 'client', 'html', 'error'),
    semester: '2230',
} as const;

let _config: Config;

if (process.env.NODE_ENV !== 'production') {
    _config = config_dev;
} else {
    _config = config_prod;
}

export const config = _config;
