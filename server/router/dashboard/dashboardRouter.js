const { RouterBuilder } = require('../routerFactory');
const {
    dashboardRenderer,
} = require('../../render/dashboard/dashboardRenderer');
function dashboardRouter() {
    return new RouterBuilder()
        .setPath('/dashboard')
        .addGetRequest('/', dashboardRenderer)
        .build();
}
module.exports = { dashboardRouter };
