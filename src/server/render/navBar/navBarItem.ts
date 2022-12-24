import { NavBarItemProperty } from '../util/navBarCommon';
// TODO rename for consistency and clarity
export interface NavBarItem {
    [key: string]: NavBarItemProperty | unknown;
}

export const navBarItem: NavBarItem = {
    Home: {
        link: '/',
    },
    Timetable: {
        link: '/school/timetable',
    },
    About: {
        link: '/about',
    },
    Login: {
        link: '/login',
        direction: 'right',
    },
};
