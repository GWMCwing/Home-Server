//TODO Rebuild the type def and class
import { generate_HKUST_Section, HKUST_Section } from './Section';
import { CheerioAPI, load } from 'cheerio';
import { CourseBase } from '../../../res/type/CourseType';
import { AvailableSchool } from '../../util/common';
import { CLL } from '../../util/consoleLogging';
export class HKUST_Course extends CourseBase {
    constructor(
        dept: string,
        id: string,
        name: string,
        credit: number,
        sectionList: HKUST_Section[],
        attribute: string[],
        description: string,
        matchingRequired: boolean,
        courseInfo: string,
        preRequisite: string,
        coRequisite: string,
        exclusion: string,
        semester: string,
        previousCode: string[],
        commonCore: string
    ) {
        super(
            dept,
            id,
            name,
            credit,
            sectionList,
            attribute,
            description,
            matchingRequired,
            courseInfo,
            preRequisite,
            coRequisite,
            exclusion,
            semester,
            previousCode,
            commonCore,
            AvailableSchool.HKUST
        );
    }
    //
}
async function getName($Course: CheerioAPI): Promise<string> {
    const courseNameInfoText = $Course('h2').text().split(' ');
    return courseNameInfoText.slice(3, -2).join(' ');
}
async function getDept($Course: CheerioAPI): Promise<string> {
    const courseNameInfoText = $Course('h2').text().split(' ');
    return courseNameInfoText[0];
}
async function getId($Course: CheerioAPI): Promise<string> {
    const courseNameInfoText = $Course('h2').text().split(' ');
    return courseNameInfoText[1];
}
async function getCredit($Course: CheerioAPI): Promise<number> {
    const courseNameInfoText = $Course('h2').text().split(' ');
    return parseInt(courseNameInfoText.slice(-2)[0].slice(1));
}
async function getAttribute($Course: CheerioAPI): Promise<string[]> {
    //TODO: Attribute
    return [];
}
async function getDescription($Course: CheerioAPI): Promise<string> {
    //TODO: Description
    return '';
}
async function getVector($Course: CheerioAPI): Promise<string> {
    //TODO: Vector
    return '';
}
async function getMatchingRequired($Course: CheerioAPI): Promise<boolean> {
    //TODO: Matching Required
    return false;
}
async function getPreRequisite($Course: CheerioAPI): Promise<string> {
    // TODO: PreRequisite
    return '';
}
async function getCoRequisite($Course: CheerioAPI): Promise<string> {
    //TODO: CoRequisite
    return '';
}
async function getExclusion($Course: CheerioAPI): Promise<string> {
    //TODO Exclusion
    return '';
}
async function getPreviousCode($Course: CheerioAPI): Promise<string[]> {
    //TODO Previous Code
    return [];
}
async function getCommonCore($Course: CheerioAPI): Promise<string> {
    //TODO Common Core
    return '';
}

async function getILO($Course: CheerioAPI): Promise<string> {
    //TODO ILO
    return '';
}
async function getSectionTrList($Course: CheerioAPI): Promise<CheerioAPI[]> {
    const sectionTableString = $Course('table.sections').html();
    if (sectionTableString === null) {
        CLL.error(
            'Task',
            'HKUST_Course',
            'Section Table is null',
            JSON.stringify($Course('table.sections'), null, 2)
        );
        return [];
    }
    const $SectionTable = load(sectionTableString, null, false);
    const sectionTrList = $SectionTable('tr').slice(1);
    const parsedSectionTrList: CheerioAPI[] = [];
    let tempSectionHtml = '';
    sectionTrList.each((index, trElement) => {
        const $TrElement = $SectionTable(trElement);
        if ($TrElement.attr('class')?.includes('newsect')) {
            if (tempSectionHtml !== '') {
                // parse the tempSectionHtml
                parsedSectionTrList.push(load(tempSectionHtml, null, false));
            }
            tempSectionHtml = '<tr>' + $TrElement.html() + '</tr>';
        } else {
            //
            tempSectionHtml += '<tr>' + $TrElement.html() + '</tr>';
        }
    });
    if (tempSectionHtml !== '')
        parsedSectionTrList.push(load(tempSectionHtml, null, false));
    return parsedSectionTrList;
}
async function getSectionList($Course: CheerioAPI): Promise<HKUST_Section[]> {
    const sectionTrList = await getSectionTrList($Course);
    const sectionList: HKUST_Section[] = [];
    for (const $SectionTr of sectionTrList) {
        const section = await generate_HKUST_Section($SectionTr);
        sectionList.push(section);
    }
    return sectionList;
}

export async function generate_HKUST_Course(
    $Course: CheerioAPI,
    semesterId: string
): Promise<HKUST_Course> {
    const dept = await getDept($Course);
    const id = await getId($Course);
    const name = await getName($Course);
    const credit = await getCredit($Course);
    const sectionList = await getSectionList($Course);
    const attribute = await getAttribute($Course);
    const description = await getDescription($Course);
    const matchingRequired = await getMatchingRequired($Course);
    const courseInfo = await getVector($Course);
    const preRequisite = await getPreRequisite($Course);
    const coRequisite = await getCoRequisite($Course);
    const exclusion = await getExclusion($Course);
    const semester = semesterId;
    const previousCode = await getPreviousCode($Course);
    const commonCore = await getCommonCore($Course);
    return new HKUST_Course(
        dept,
        id,
        name,
        credit,
        sectionList,
        attribute,
        description,
        matchingRequired,
        courseInfo,
        preRequisite,
        coRequisite,
        exclusion,
        semester,
        previousCode,
        commonCore
    );
}
