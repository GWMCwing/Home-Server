import { AvailableSchool } from '../../server/util/common';
import { SchoolName } from './common';
import { SectionBase } from './SectionType';

export abstract class CourseBase {
    /** department of the course */
    dept: string;
    /** id of the course (e.g. 1000, 1000A) */
    id: string;
    /** name of the course (e.g. Introduction to Computer Science) */
    name: string;
    /** credit of the course */
    credit: number;
    //
    /** list of sections of the course */
    sectionList: SectionBase[];
    //
    /** attribute of the course */
    attribute: string[];
    /** description of the course */
    description: string;
    //
    /** require matching section and lab */
    matchingRequired: boolean;
    /** course info of the course */
    courseInfo: string;
    //
    preRequisite: string;
    coRequisite: string;
    exclusion: string;
    //
    /** semester of the course */
    semester: string;
    previousCode: string[];
    /** part of common core of the course */
    commonCore: string;
    //
    /** which school of the course */
    school: SchoolName;
    //
    constructor(
        dept: string,
        id: string,
        name: string,
        credit: number,
        sectionList: SectionBase[],
        attribute: string[],
        description: string,
        matchingRequired: boolean,
        courseInfo: string,
        preRequisite: string,
        coRequisite: string,
        exclusion: string,
        semester: string,
        previousCode: string[],
        commonCore: string,
        school: SchoolName
    ) {
        this.dept = dept;
        this.id = id;
        this.name = name;
        this.credit = credit;
        this.sectionList = sectionList;
        this.attribute = attribute;
        this.description = description;
        this.matchingRequired = matchingRequired;
        this.courseInfo = courseInfo;
        this.preRequisite = preRequisite;
        this.coRequisite = coRequisite;
        this.exclusion = exclusion;
        this.semester = semester;
        this.previousCode = previousCode;
        this.commonCore = commonCore;
        this.school = school;
    }
}
//
export interface HKUST_Course_Interface {
    dept: string;
    id: string;
    name: string;
    credit: number;
    //
    sectionList: SectionBase[];
    //
    attribute: string[];
    description: string;
    //
    matchingRequired: boolean;
    courseInfo: string;
    //
    preRequisite: string;
    coRequisite: string;
    exclusion: string;
    //
    semester: string;
    previousCode: string[];
    commonCore: string;
    //
    school: SchoolName;
}

export function isHKUST_Course(
    course: CourseBase
): course is HKUST_Course_Interface {
    return course.school === AvailableSchool.HKUST;
}
