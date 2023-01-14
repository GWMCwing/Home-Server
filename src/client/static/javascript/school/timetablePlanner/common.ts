import { DateTime } from '../../../../../res/type/SectionType';

function timeToStr(time: number): string {
    const hour: number = Math.floor(time / 60);
    const hourStr: string = hour < 10 ? `0${hour}` : `${hour}`;
    const min: number = time % 60;
    const minStr: string = min < 10 ? `0${min}` : `${min}`;
    return `${hourStr}:${minStr}`;
}
export function asStringList(dateTime: DateTime): string[] {
    const strList: string[] = [];
    console.log(dateTime.dayOfWeek.length);
    for (let i = 0; i < dateTime.dayOfWeek.length; i++) {
        if (dateTime.dayOfWeek[i][0] === 'TBA') strList.push('TBA');
        else {
            const startTime = timeToStr(dateTime.startTime[i]);
            const endTime = timeToStr(dateTime.endTime[i]);
            strList.push(
                `${dateTime.dayOfWeek[i].join('')} ${startTime}-${endTime}`
            );
        }
    }
    return strList;
}
