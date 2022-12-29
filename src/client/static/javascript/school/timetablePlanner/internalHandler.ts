import { SchoolName } from '../../../../../res/type/common';
import { CourseBase } from '../../../../../res/type/CourseType';
import { CourseMap, CourseMap_String, DeptMap } from '../type';
import { fetchCourseList } from './fetch.js';
// handle all data manipulation
export class TimetableInternalHandler {
    private deptMap: DeptMap = new Map();
    private selectedCourseMap: CourseMap_String = new Map();
    constructor(private semester: string, private school: SchoolName) {}
    //
    parseCourseList(courseList: CourseBase[]): CourseMap {
        const courseMap: CourseMap = new Map();
        courseList.forEach((course) => {
            courseMap.set(course.id, course);
        });
        return courseMap;
    }
    parseCourseMap(courseMap: CourseMap): CourseBase[] {
        const courseList: CourseBase[] = [];
        courseMap.forEach((course, id) => {
            courseList.push(course);
        });
        return courseList;
    }

    async fetchCourseList(deptName: string): Promise<CourseBase[]> {
        if (this.deptMap.has(deptName)) {
            const courseMap = this.deptMap.get(deptName);
            if (courseMap === undefined) {
                console.warn('Undefined Course Map, Resetting...');
                this.deptMap.delete(deptName);
                return this.fetchCourseList(deptName);
            }
            return this.parseCourseMap(courseMap);
        }
        const courseList: CourseBase[] | Error = await fetchCourseList(
            deptName,
            this.semester,
            this.school
        ).catch((err) => {
            console.log(err);
            return new Error('Failed to fetch course list');
        });
        if (courseList instanceof Error) {
            return []; // return empty map if fail to fetch course list
        }
        const courseMap = this.parseCourseList(courseList);
        this.deptMap.set(deptName, courseMap);
        return courseList;
    }
}
