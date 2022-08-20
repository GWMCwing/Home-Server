const { RouterBuilder } = require('../routerBuilder');
const {
    timetableRendererCallback,
} = require('../../render/school/timetable/timetableRenderer');
function schoolRouter() {
    return new RouterBuilder()
        .setPath('/school')
        .addGetRequest('/timetable', timetableRendererCallback)
        .build();
}
module.exports = { schoolRouter };
