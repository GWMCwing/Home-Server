const path = require('path');
const hash = require('pbkdf2-password')({ digest: 'sha256' });
//
const rootPath = path.join(__dirname, '..', '..');
//
const port = 80;
const mongodbUrl = 'mongodb://localhost:27017';
// TODO grab ip and config string from .env in dev, bind to 0.0.0.0 in production
// const mongodbUrl_Cloud_SSL =
//
const viewPath = path.join(rootPath, 'client', 'html', 'view');
const cssPath = path.join(rootPath, 'client', 'static', 'css');
const publicJSPath = path.join(rootPath, 'client', 'static', 'javascript');
const htmlStructurePath = path.join(rootPath, 'client', 'static', 'html', 'structure');
const errorPath = path.join(rootPath, 'client', 'html', 'error');

module.exports = {
    port,
    mongodbUrl,
    // mongodbUrl_Cloud_SSL,
    viewPath,
    cssPath,
    publicJSPath,
    htmlStructurePath,
    errorPath,
    hash,
};
