import { SchoolName } from '../../../../../res/type/common';
import { TimetableInternalHandler } from './internalHandler.js';
import { DisplayHandler } from './displayHandler.js';
//
export class Timetable {
    private internalHandler: TimetableInternalHandler;
    private displayHandler: DisplayHandler;
    constructor(private semester: string, private school: SchoolName) {
        this.internalHandler = new TimetableInternalHandler(semester, school);
        this.displayHandler = new DisplayHandler();
        this.initEventHandler();
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

    public async selectDept(deptName: string): Promise<boolean> {
        const courseList = await this.internalHandler.fetchCourseList(deptName);
        if (courseList.length === 0) {
            console.log('Failed to fetch course list');
            return false;
        }
        this.displayHandler.displayCourseList(courseList);
        return true;
    }
}
