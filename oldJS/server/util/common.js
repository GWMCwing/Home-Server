require('dotenv').config();
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
const htmlStructurePath = path.join(rootPath, 'client', 'static', 'html', 'structure');
//
const availableSchool = ['HKUST'];
//
const errorPath = path.join(rootPath, 'client', 'html', 'error');

module.exports = {
    port,
    mongodbUrl,
    // mongodbUrl_Cloud_SSL,
    viewPath,
    cssPath,
    publicJSPath,
    htmlStructurePath,
    availableSchool,
    errorPath,
    hash,
};
