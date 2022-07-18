const express = require('express');
const {
    cssPath,
    publicJSPath,
    htmlStructurePath,
} = require('../../util/common');
function serveStatic(app) {
    app.use('/resource/css', express.static(cssPath));
    app.use('/resource/javascript', express.static(publicJSPath));
    // app.use('/resource/html/structure', express.static(htmlStructurePath));
}

module.exports = { serveStatic };
