import { SchoolName } from '../../../../../res/type/common';
import { CourseBase } from '../../../../../res/type/CourseType';
export async function fetchCourseList(
    dept: string,
    semester: string,
    school: SchoolName
): Promise<CourseBase[]> {
    const res = await fetch(
        `/api/courseList?dept=${dept}&semester=${semester}&school=${school}`
    );
    if (res.status !== 200) {
        throw new Error('Failed to fetch course list');
    }
    const json = await res.json();
    if (json.error) {
        throw new Error('Failed to fetch course list');
    }
    return json.list as CourseBase[];
}

export async function fetchCourseDetail(
    dept: string,
    id: string,
    school: SchoolName,
    semester: string
): Promise<CourseBase> {
    const res = await fetch(
        `/api/course?dept=${dept}&id=${id}&school=${school}&semester=${semester}`
    );
    if (res.status !== 200) {
        throw new Error('Failed to fetch course detail');
    }
    const json = await res.json();
    if (json.error) {
        throw new Error('Failed to fetch course detail');
    }
    return json.course as CourseBase;
}
