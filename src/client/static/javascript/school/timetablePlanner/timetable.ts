import { SchoolName } from '../../../../../res/type/common';
import { TimetableInternalHandler } from './internalHandler.js';
import { DisplayHandler } from './displayHandler.js';
//
export class Timetable {
    private internalHandler: TimetableInternalHandler;
    private displayHandler: DisplayHandler;
    constructor(semester: string, school: SchoolName) {
        this.internalHandler = new TimetableInternalHandler(semester, school);
        this.displayHandler = new DisplayHandler();
    }
    // handle all events call by user, onclick, hover, etc.
}
