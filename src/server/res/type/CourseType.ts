import { AvailableSchool } from '../../util/common';
import { SectionBase } from '../../tasks/courseList/SectionType';

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
    preRequsite: string;
    coRequesite: string;
    exclusion: string;
    //
    semester: string;
    previousCode: string[];
    commonCore: string;
    //
    school: AvailableSchool;
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
        preRequsite: string,
        coRequesite: string,
        exclusion: string,
        semester: string,
        previousCode: string[],
        commonCore: string,
        school: AvailableSchool
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
        this.preRequsite = preRequsite;
        this.coRequesite = coRequesite;
        this.exclusion = exclusion;
        this.semester = semester;
        this.previousCode = previousCode;
        this.commonCore = commonCore;
        this.school = school;
    }
}
