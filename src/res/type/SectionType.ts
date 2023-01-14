export type SectionType_HKUST =
    typeof SectionType_HKUST[keyof typeof SectionType_HKUST];
export const SectionType_HKUST = {
    Lecture: 'L',
    Tutorial: 'T',
    Laboratory: 'LA',
    R: 'R',
} as const;

export type SectionType = SectionType_HKUST;
//
export type DayOfWeek = typeof DayOfWeek[keyof typeof DayOfWeek];
export const DayOfWeek = {
    Unknown: 'Unknown',
    TBA: 'TBA',
    Monday: 'Mo',
    Tuesday: 'Tu',
    Wednesday: 'We',
    Thursday: 'Th',
    Friday: 'Fr',
    Saturday: 'Sa',
    Sunday: 'Su',
} as const;
export const Regex_dayOfWeek = [
    '((Mo)|(Tu)|(We)|(Th)|(Fr)|(Sa)|(Su))',
    'g',
] as const;

export function isDayOfWeek(dayOfWeek: string): dayOfWeek is DayOfWeek {
    return Object.values(DayOfWeek).includes(dayOfWeek as DayOfWeek);
}

export class DateTime {
    dayOfWeek: DayOfWeek[][];
    startTime: number[]; // number of minutes from 00:00
    endTime: number[]; // number of minutes from 00:00
    constructor(
        dayOfWeek: DayOfWeek[][] = [],
        startTime: number[] = [],
        endTime: number[] = []
    ) {
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}

export interface SectionBaseInterface {
    name: string;
    id: string;
    type: SectionType;
    dateTime: DateTime;
    location: string[];
    instructor: string[];
    dateTimeCount: number; // number of day of week of the section
    //
    quota: number;
    enrolled: number;
    available: number;
    waitlist: number;
    //
    remarks: string; // TODO remark should be an instance of a class
    requireConcent: boolean;
}

export abstract class SectionBase implements SectionBaseInterface {
    name: string;
    id: string;
    type: SectionType;
    dateTime: DateTime;
    location: string[];
    instructor: string[];
    dateTimeCount: number; // number of day of week of the section
    //
    quota: number;
    enrolled: number;
    available: number;
    waitlist: number;
    //
    remarks: string; // TODO remark should be an instance of a class
    requireConcent: boolean;
    //
    constructor(
        name: string,
        id: string,
        type: SectionType,
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
        this.name = name;
        this.id = id;
        this.type = type;
        this.dateTime = dateTime;
        this.location = location;
        this.instructor = instructor;
        this.dateTimeCount = dateTimeCount;
        //
        this.quota = quota;
        this.enrolled = enrolled;
        this.available = available;
        this.waitlist = waitlist;
        //
        this.remarks = remarks;
        this.requireConcent = requireConcent;
    }
}
