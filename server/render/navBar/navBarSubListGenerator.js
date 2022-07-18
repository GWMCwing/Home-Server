const { ObjBuilder } = require('../util/pugObjectBuilder');
class NavBarSubItemFactory extends ObjBuilder {
    constructor() {
        super();
    }
    setName(name) {
        return this.setCustom('name', name);
    }
    setDescription(description) {
        return this.setCustom('description', description);
    }
}
function generateSubItemList(list) {
    if (!list || Object.entries(list).length === 0) return [];
    let itemList = [];
    for (const [key, item] of Object.entries(list)) {
        itemList.push(
            new NavBarSubItemFactory()
                .setName(item.name || key)
                .setDescription(item.description || '')
                .build()
        );
    }
    return itemList;
}
module.exports = { generateSubItemList };
