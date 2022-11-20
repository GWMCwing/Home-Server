const { RouterBuilder } = require('../routerBuilder');
const { courseList_API_Router } = require('./courseList/courseList_API');

function API_Router() {
    return new RouterBuilder()
        .setPath('/API')
        .addRouter(...courseList_API_Router())
        .build();
}
module.exports = { API_Router };
