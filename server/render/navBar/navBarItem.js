const { NavBar } = require('../util/navBarCommon');
// Optional name, will be interpreted as key if not given
// optional direction, will be interpreted as NavBar.direction.left if not given
const navBarItem = {
    Home: {
        link: '/',
    },
    About: {
        link: '/about',
    },
    Login: {
        link: '/login',
        direction: NavBar.direction.right,
    },
};

module.exports = { navBarItem };
