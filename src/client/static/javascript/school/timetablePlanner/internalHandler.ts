import { SchoolName } from '../../../../../res/type/common';
import { CourseMap_String, DeptMap } from '../type';
// handle all data manipulation
export class TimetableInternalHandler {
    private deptMap: DeptMap = new Map();
    private selectedCourseMap: CourseMap_String = new Map();
    constructor(public semester: string, public school: SchoolName) {}
    //
}
