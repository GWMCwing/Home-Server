const { NavBar } = require('../util/navBarCommon');
const { ObjBuilder } = require('../util/pugObjectBuilder');
const { generateSubItemList } = require('./navBarSubListGenerator');
const { navBarItem } = require('./navBarItem');
class NavBarItemFactory extends ObjBuilder {
    constructor() {
        super();
    }
    #concatenateClass(pageLink) {
        const classKeyList = ['direction'];
        for (let i = 0; i < classKeyList.length; i++) {
            this.addClassName(this.getCustom(classKeyList[i]));
        }
        // set active move to client side
    }
    build(pageLink) {
        return super.build();
    }
    setName(name) {
        return this.setCustom('name', name);
    }
    setDirection(direction, isClassName = false) {
        return this.setCustom('direction', direction, isClassName);
    }
    setSubItemList(subItemList) {
        return this.setCustom('subItemList', subItemList);
    }
}
function generateNavBarItemList(req) {
    let navBarItemList = [];
    for (const [key, item] of Object.entries(navBarItem)) {
        navBarItemList.push(
            new NavBarItemFactory()
                .setName(item.name || key)
                .setDirection(item.direction || NavBar.direction.left, true)
                .setSubItemList(generateSubItemList(item.subItemList))
                .setLink(item.link)
                .build(req.url)
        );
    }
    return navBarItemList;
}
module.exports = { generateNavBarItemList };
