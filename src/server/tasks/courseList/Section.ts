/* eslint-disable indent */
import { load, CheerioAPI } from 'cheerio';
import {
    DateTime,
    DayOfWeek,
    isDayOfWeek,
    Regex_dayOfWeek,
    SectionType_HKUST,
    SectionBase,
} from '../../../res/type/SectionType';

/**
 *
 * @param $Section Parsed Section that contain all Tr element in the section
 * @returns
 */
async function parseTdList($Section: CheerioAPI): Promise<CheerioAPI[][]> {
    const $tdList: CheerioAPI[][] = [];
    $Section('tr').each((i, tr) => {
        const $tr = load(tr, null, false);
        const tempTdList: CheerioAPI[] = [];
        $tr('td').each((i, td) => {
            tempTdList.push(load(td));
        });
        $tdList.push(tempTdList);
    });
    return $tdList;
}

async function getSectionId(
    $Section: CheerioAPI,
    $tdList: CheerioAPI[][]
): Promise<string> {
    const sectionText = $tdList[0][0].text();
    const id = sectionText.split('(')[1];
    if (id === undefined) {
        for (const $td of $tdList) {
            for (const $tdElement of $td) {
                console.log($tdElement.text());
            }
        }
        console.log(sectionText);
        throw new Error('Section Id is undefined');
    }
    return id.substring(0, id.length - 1);
}
async function getSectionName(
    $Section: CheerioAPI,
    $tdList: CheerioAPI[][]
): Promise<string> {
    const sectionText = $tdList[0][0].text();
    const nameText = sectionText.split('(')[0];
    let i = 0;
    for (; nameText[i] < '0' || nameText[i] > '9'; i++);
    return nameText.substring(i).trim();
}
async function getSectionType(
    $Section: CheerioAPI,
    $tdList: CheerioAPI[][]
): Promise<SectionType_HKUST> {
    const sectionText = $tdList[0][0].text();
    const reg = new RegExp('(\\D*)(\\d*)'); // first group is type second group is number and sub section
    const index = (reg.exec(sectionText) as string[])[1] as SectionType_HKUST;
    // TODO checking for new type or unmatched
    return index;
}
async function parseDayOfWeek(str: string): Promise<DayOfWeek[]> {
    const reg = new RegExp(...Regex_dayOfWeek);
    const result: DayOfWeek[] = [];
    let dayOfWeek;
    while ((dayOfWeek = reg.exec(str))) {
        if (isDayOfWeek(dayOfWeek[0])) {
            result.push(dayOfWeek[0]);
        } else {
            result.push(DayOfWeek.Unknown);
        }
    }
    if (result.length === 0) {
        result.push(DayOfWeek.TBA);
    }
    return result;
}
async function parseTime(str: string): Promise<number> {
    const reg = new RegExp('(\\d{2}):(\\d{2})((AM)|(PM))');
    const time = reg.exec(str);
    if (time) {
        return (
            parseInt(time[1]) * 60 +
            parseInt(time[2]) +
            (time[3] === 'PM' ? 12 * 60 : 0)
        );
    } else {
        return -1;
    }
}
async function getSectionDateTime(
    $Section: CheerioAPI,
    $tdList: CheerioAPI[][]
): Promise<DateTime> {
    const dayOfWeek: DayOfWeek[] = [];
    const startTime: number[] = [];
    const endTime: number[] = [];
    for (let i = 0; i < $tdList.length; i++) {
        //
        const timeText = $tdList[i][i > 0 ? 0 : 1].text();
        if (timeText === 'TBA') {
            dayOfWeek.push(DayOfWeek.TBA);
            startTime.push(0);
            endTime.push(0);
            continue;
        }
        //
        dayOfWeek.push(...(await parseDayOfWeek(timeText)));
        // some courses include day and month using -
        // => get the last 2 element to ensure is the time only
        const timeList = timeText.split('-').slice(-2);
        const startTime_temp = await parseTime(timeList[0]);
        const endTime_temp = await parseTime(timeList[1]);
        for (let j = 0; j < dayOfWeek.length; j++) {
            startTime.push(startTime_temp);
            endTime.push(endTime_temp);
        }
    }
    return new DateTime(dayOfWeek, startTime, endTime);
}
async function getSectionLocation(
    $Section: CheerioAPI,
    $tdList: CheerioAPI[][]
): Promise<string[]> {
    //TODO
    return [];
}
async function getSectionInstructor(
    $Section: CheerioAPI,
    $tdList: CheerioAPI[][]
): Promise<string[]> {
    //TODO
    return [];
}
//
async function getSectionQuota(
    $Section: CheerioAPI,
    $tdList: CheerioAPI[][]
): Promise<number> {
    //TODO
    return -1;
}
async function getSectionEnrolled(
    $Section: CheerioAPI,
    $tdList: CheerioAPI[][]
): Promise<number> {
    //TODO
    return -1;
}
async function getSectionAvailable(
    $Section: CheerioAPI,
    $tdList: CheerioAPI[][]
): Promise<number> {
    //TODO
    return -1;
}
async function getSectionWaitlist(
    $Section: CheerioAPI,
    $tdList: CheerioAPI[][]
): Promise<number> {
    //TODO
    return -1;
}
//
async function getSectionRemarks(
    $Section: CheerioAPI,
    $tdList: CheerioAPI[][]
): Promise<string> {
    //TODO
    return '';
}
async function getSectionRequireConcent(
    $Section: CheerioAPI,
    $tdList: CheerioAPI[][]
): Promise<boolean> {
    return $Section('div.popup.consent').text() !== '';
}

export class HKUST_Section extends SectionBase {
    override type: SectionType_HKUST;
    constructor(
        name: string,
        id: string,
        type: SectionType_HKUST,
        dateTime: DateTime,
        location: string[],
        instructor: string[],
        dateTimeCount: number,
        quota: number,
        enrolled: number,
        available: number,
        waitlist: number,
        remarks: string,
        requireConcent: boolean
    ) {
        super(
            name,
            id,
            type,
            dateTime,
            location,
            instructor,
            dateTimeCount,
            quota,
            enrolled,
            available,
            waitlist,
            remarks,
            requireConcent
        );
        this.type = type; // strict class initialization
    }
    //
}

export async function generate_HKUST_Section($Section: CheerioAPI) {
    const $tdList = await parseTdList($Section);
    const id = await getSectionId($Section, $tdList);
    const name = await getSectionName($Section, $tdList);
    const type = await getSectionType($Section, $tdList);
    const dateTime = await getSectionDateTime($Section, $tdList);
    const location = await getSectionLocation($Section, $tdList);
    const instructor = await getSectionInstructor($Section, $tdList);
    const quota = await getSectionQuota($Section, $tdList);
    const enrolled = await getSectionEnrolled($Section, $tdList);
    const available = await getSectionAvailable($Section, $tdList);
    const waitlist = await getSectionWaitlist($Section, $tdList);
    const remarks = await getSectionRemarks($Section, $tdList);
    const requireConcent = await getSectionRequireConcent($Section, $tdList);

    const dateTimeCount = dateTime.dayOfWeek.length;
    return new HKUST_Section(
        name,
        id,
        type,
        dateTime,
        location,
        instructor,
        dateTimeCount,
        quota,
        enrolled,
        available,
        waitlist,
        remarks,
        requireConcent
    );
}
