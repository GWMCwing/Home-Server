import { RouterBuilder } from '../routerBuilder';
import { courseList_API_Router } from './courseList/courseList_API';

export function API_Router() {
    return new RouterBuilder()
        .setPath('/API')
        .addRouter(...courseList_API_Router())
        .build();
}
