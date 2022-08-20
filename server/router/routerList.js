const { rendererList: r } = require('../render/rendererList');
const routerList = {
    root: {
        path: '/',
        view: r.homepageRenderer,
        router: {},
    },
    login: {},
    school: {},
    dashboard: {},
};

module.exports = { routerList };
