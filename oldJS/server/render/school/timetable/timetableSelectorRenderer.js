const { availableSchool } = require('../../../util/common');
const path = require('path');
const { viewPath } = require('../../../util/common');
async function timetableSelectorRendererCallback(req, res) {
    let pugObject = {
        availableSchool: availableSchool,
    };
    res.render(
        path.join(viewPath, 'school', 'timetable', 'timetableSelector.pug'),
        pugObject
    );
}
module.exports = { timetableSelectorRendererCallback };
