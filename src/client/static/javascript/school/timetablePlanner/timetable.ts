import { SchoolName } from '../../../../../res/type/common';
import { TimetableInternalHandler } from './internalHandler.js';
import { DisplayHandler } from './displayHandler.js';
import { SectionBase } from '../../../../../res/type/SectionType';
//
export class Timetable {
    static #_instance: Timetable;
    private internalHandler!: TimetableInternalHandler;
    private displayHandler!: DisplayHandler;
    constructor(private semester: string, private school: SchoolName) {
        if (Timetable.#_instance) {
            return Timetable.#_instance;
        }
        Timetable.#_instance = this;
        this.internalHandler = new TimetableInternalHandler(semester, school);
        this.displayHandler = new DisplayHandler();
        this.initEventHandler();
    }
    static getInstance() {
        return this.#_instance;
    }
    // handle all events call by user, onclick, hover, etc.
    private initEventHandler() {
        this.setDeptEventListener();
        this.setBackButtonEventListener();
    }
    setDeptEventListener() {
        this.displayHandler.deptSelectorListDom.childNodes.forEach((dept) => {
            if (dept.textContent === null || dept.textContent === '') return;
            dept.addEventListener('click', () => {
                this.selectDept(dept.textContent as string);
            });
        });
    }
    setBackButtonEventListener() {
        this.displayHandler.backButtonDom.addEventListener('click', () => {
            this.displayHandler.hideBackButton_leftPanel();
        });
    }
    //
    async selectCourse(dept: string, courseId: string) {
        const course = await this.internalHandler.fetchCourse(dept, courseId);
        if (course == null) {
            console.log('Failed to fetch course');
            return false;
        }
        this.displayHandler.displayCourseDetail(course);
        return true;
    }
    //

    public async selectDept(deptName: string): Promise<boolean> {
        const courseList = await this.internalHandler.fetchCourseList(deptName);
        if (courseList.length === 0) {
            console.log('Failed to fetch course list');
            return false;
        }
        this.displayHandler.displayCourseList(courseList);
        return true;
    }
    public async selectSection(
        dept: string,
        courseCode: string,
        section: SectionBase
    ): Promise<boolean> {
        this.displayHandler.displaySectionIcon(dept, courseCode, section);
        return true;
    }
}
