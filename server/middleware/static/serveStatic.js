const express = require('express');
const {
    cssPath,
    publicJSPath,
    htmlStructurePath,
} = require('../../util/common');
function serveStatic(app) {
    app.use('/resource/css', express.static(cssPath));
    app.use('/resource/js', express.static(publicJSPath));
    app.use('/resource/html/structure', express.static(htmlStructurePath));
}

module.exports = { serveStatic };
