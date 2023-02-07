import { RouterBuilder } from '../routerBuilder';
import { geneticAlgoRenderer } from './GeneticAlgo/geneticAlog';

export function reactRouter() {
    return new RouterBuilder()
        .setPath('/react')
        .addGetRequest('/geneticAlgo', geneticAlgoRenderer)
        .build();
}
