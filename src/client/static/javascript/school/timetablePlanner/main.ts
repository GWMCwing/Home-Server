import { SchoolName } from '../../../../../res/type/common';
import { Timetable } from './timetable.js';
let timetable: Timetable;

function getInfo(): { semester: string; school: SchoolName } {
    const infoDiv = document.getElementById('info') as HTMLDivElement;
    const semester = infoDiv.getAttribute('semester') as string;
    const school = infoDiv.getAttribute('school') as SchoolName;
    return { semester, school };
}

window.addEventListener('load', function () {
    const { semester, school } = getInfo();
    timetable = new Timetable(semester, school);
});
