import { AvailableSchool } from '../../server/util/common';
import { SchoolName } from './common';
import { SectionBase } from './SectionType';

export abstract class CourseBase {
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
