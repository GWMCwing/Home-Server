const { availableSchool } = require('../../util/common');
const { RouterBuilder } = require('../routerBuilder');
const {
    timetableRendererCallback,
} = require('../../render/school/timetable/timetableRenderer');
const {
    timetableSelectorRendererCallback,
} = require('../../render/school/timetable/timetableSelectorRenderer');

function timetableRouter() {
    return new RouterBuilder()
        .setPath('/timetable')
        .addGetRequest('/', timetableSelectorRendererCallback)
        .addGetRequest('/:schoolName', timetableRendererCallback)
        .build();
}
function schoolRouter() {
    return new RouterBuilder()
        .setPath('/school')
        .addRouter(...timetableRouter())
        .build();
}
module.exports = { schoolRouter };
