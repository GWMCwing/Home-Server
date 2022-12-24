import { RouterBuilder } from '../routerBuilder';
import { timetableRendererCallback } from '../../render/school/timetable/timetableRenderer';
import { timetableSelectorRendererCallback } from '../../render/school/timetable/timetableSelectorRenderer';

function timetableRouter() {
    return new RouterBuilder()
        .setPath('/timetable')
        .addGetRequest('/', timetableSelectorRendererCallback)
        .addGetRequest('/:schoolName', timetableRendererCallback)
        .build();
}
export function schoolRouter() {
    return new RouterBuilder()
        .setPath('/school')
        .addRouter(...timetableRouter())
        .build();
}
