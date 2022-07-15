const path = require('path');
//
const rootPath = path.join(__dirname, '..', '..');
//
const port = 9522;
const viewPath = path.join(rootPath, 'client', 'view');
const cssPath = path.join(rootPath, 'client', 'static', 'css');
const publicJSPath = path.join(rootPath, 'client', 'static', 'javascript');
const htmlStructurePath = path.join(
    rootPath,
    'client',
    'static',
    'html',
    'structure'
);
const errorPath = path.join(rootPath, 'client', 'static', 'html', 'error');

module.exports = {
    port,
    viewPath,
    cssPath,
    publicJSPath,
    htmlStructurePath,
    errorPath,
};
