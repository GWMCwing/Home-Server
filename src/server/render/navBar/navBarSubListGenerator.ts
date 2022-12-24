import { PugObjBuilder } from '../util/pugObjBuilder';
export class NavBarSubListGenerator extends PugObjBuilder {
    constructor() {
        super();
    }
    setName(name: string) {
        return this.setCustom('name', name);
    }
    setDescription(description: string) {
        return this.setCustom('description', description);
    }
}

interface NavBarItem extends Record<string, unknown> {
    name: string;
    description: string;
}
export function generateSubItemList(
    list: { name: string; description: string }[]
): NavBarItem[] {
    if (!list || Object.entries(list).length === 0) return [];
    const itemList = [];
    for (const [key, item] of Object.entries(list)) {
        itemList.push(
            new NavBarSubListGenerator()
                .setName(item.name || key)
                .setDescription(item.description || '')
                .build() as NavBarItem
        );
    }
    return itemList;
}
