const path = require('path');
const hash = require('pbkdf2-password')({ digest: 'sha256' });
//
const rootPath = path.join(__dirname, '..', '..');
//
const port = 80;
const mongodbUrl = 'mongodb://localhost:27017';
//
const viewPath = path.join(rootPath, 'client', 'html', 'view');
const cssPath = path.join(rootPath, 'client', 'static', 'css');
const publicJSPath = path.join(rootPath, 'client', 'static', 'javascript');
const htmlStructurePath = path.join(
    rootPath,
    'client',
    'static',
    'html',
    'structure'
);
const errorPath = path.join(rootPath, 'client', 'html', 'error');

const cookieName = {
    loginToken: 'loginToken',
};

module.exports = {
    port,
    mongodbUrl,
    viewPath,
    cssPath,
    publicJSPath,
    htmlStructurePath,
    errorPath,
    hash,
    cookieName,
};
