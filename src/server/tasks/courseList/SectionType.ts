import {
    SectionBaseInterface,
    DateTime,
    SectionType,
} from '../../res/type/SectionType';
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
