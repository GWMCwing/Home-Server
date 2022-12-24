import { RouterBuilder } from '../routerBuilder';
import { dashboardRenderer } from '../../render/dashboard/dashboardRenderer';
export function dashboardRouter() {
    return new RouterBuilder()
        .setPath('/dashboard')
        .addGetRequest('/', dashboardRenderer)
        .build();
}
