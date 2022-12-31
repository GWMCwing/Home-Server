import { DateTime } from '../../../../../res/type/SectionType';

export function asStringList(dateTime: DateTime): string[] {
    const strList: string[] = [];
    for (let i = 0; i < dateTime.dayOfWeek.length; i++) {
        strList.push(
            `${dateTime.dayOfWeek[i]} ${dateTime.startTime[i]}-${dateTime.endTime[i]}`
        );
    }
    return strList;
}
