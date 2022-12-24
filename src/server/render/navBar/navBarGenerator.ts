import { NavBarItemProperty } from '../util/navBarCommon';
import { PugObjBuilder } from '../util/pugObjBuilder';
import { generateSubItemList } from './navBarSubListGenerator';
import { navBarItem, NavBarItem } from './navBarItem';
import { Request } from 'express';

class NavBarItemFactory extends PugObjBuilder {
    constructor() {
        super();
    }
    // #concatenateClass(pageLink: string) {
    //     const classKeyList = ['direction'];
    //     for (let i = 0; i < classKeyList.length; i++) {
    //         this.addClassName(this.getCustom(classKeyList[i]) as string);
    //     }
    //     // set active move to client side
    // }
    override build(): NavBarItem {
        return super.build();
    }
    setName(name: string) {
        return this.setCustom('name', name);
    }
    setDirection(direction: string, isClassName = false) {
        return this.setCustom('direction', direction, isClassName);
    }
    setSubItemList(subItemList: NavBarItem[]) {
        return this.setCustom('subItemList', subItemList);
    }
}
// TODO: factorize all code-time type checking
export function generateNavBarItemList(req: Request) {
    const navBarItemList = [];
    for (const [key, item] of Object.entries(navBarItem)) {
        navBarItemList.push(
            new NavBarItemFactory()
                .setName(((item as NavBarItem).name as string) || key)
                .setDirection(
                    ((item as NavBarItem).direction as string) || 'left',
                    true
                )
                .setSubItemList(
                    generateSubItemList(
                        (item as NavBarItem).subItemList as {
                            name: string;
                            description: string;
                        }[]
                    )
                )
                .setLink((item as NavBarItem).link as string)
                // .build(req.url)
                .build()
        );
    }
    return navBarItemList;
}
