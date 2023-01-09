//TODO make it json
interface CourseList_config {
    test: boolean;
    testUrl: string;
    baseUrl: string;
    url: string;
    sleepTime: number;
    enable: boolean;
}
export const courseList_config: CourseList_config = {
    test: false,
    testUrl: 'http://localhost:5555',
    baseUrl: 'http://w5.ab.ust.hk',
    url: 'http://w5.ab.ust.hk/wcq/cgi-bin',
    sleepTime: 250,
    enable: false,
} as const;
