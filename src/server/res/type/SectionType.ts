export type SectionType_HKUST = 'L' | 'LA' | 'T' | 'R';

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
    return dayOfWeek in DayOfWeek;
}

export class DateTime {
    protected dayOfWeek: DayOfWeek[];
    protected startTime: number[]; // number of minutes from 00:00
    protected endTime: number[]; // number of minutes from 00:00
    constructor(
        dayOfWeek: DayOfWeek[] = [],
        startTime: number[] = [],
        endTime: number[] = []
    ) {
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.endTime = endTime;
    }
    get getDayOfWeek() {
        return this.dayOfWeek;
    }
    get getStartTime() {
        return this.startTime;
    }
    get getEndTime() {
        return this.endTime;
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
