class Timetable {
    constructor() {
        this.credit = 0;
        this.deptList = {};
        this.inPlan = []; // {dept, id}
        this.inGrid = []; // {dept, id, choseSection[], element[]}[]
        this.favorite = []; // {dept,id}
        this.hoverDisplay = []; // {dept, id, choseSection[], element[]}[]
        this.gridDom = [];
        this.detailDiv;
        this.suggestionDiv;
        this.#setup();
    }
    setDeptList(dept, list) {
        const tempObj = {};
        for (let i = 0; i < list.length; i++) {
            tempObj[list[i].id] = list[i];
        }
        this.deptList[dept] = tempObj;
    }
    selectCourseToDisplay(dept, id) {
        const sectionList = this.deptList[dept][id].section;
        console.log(sectionList);
        console.log(this.#parseToSectionType(sectionList));
    }

    async mouseEnterDisplay(dept, id) {}
    async mouseLeaveDisplay(dept, id) {}
    #parseToSectionType(sectionList) {
        const tempSectionType = {};
        for (let i = 0; i < sectionList.length; i++) {
            const section = sectionList[i];
            if (tempSectionType[section.type]) {
                tempSectionType[section.type].push(section);
            } else {
                tempSectionType[section.type] = [section];
            }
        }
        return tempSectionType;
    }
    #isAllConflict(sectionList) {}
    #isConflict(section) {}
    #setup() {
        const gridDom = document.getElementById('grid');
        for (let i = 0; i < gridDom.childElementCount; i++) {
            this.gridDom.push(gridDom.children[i]);
        }
        this.detailDiv = document.getElementById('planner-detail');
        this.suggestionDiv = document.getElementById('planner-suggestion');
        this.detailDiv.style.display = 'none';
        this.suggestionDiv.style.display = 'none';
    }
    #getDowDom(DOW) {
        switch (DOW) {
            case 'Mo':
                return this.gridDom[0];
            case 'Tu':
                return this.gridDom[1];
            case 'We':
                return this.gridDom[2];
            case 'Th':
                return this.gridDom[3];
            case 'Fr':
                return this.gridDom[4];
            case 'Sa':
                return this.gridDom[5];
            case 'Su':
                return this.gridDom[6];
            default:
                return false;
        }
    }
    #timeToRatio(startTime, endTime) {
        const startHr =
            parseInt(startTime.substring(0, 2)) + startTime.endsWith('PM')
                ? 12
                : 0;
        const startMin = parseInt(startTime.substring(3, 5)) > 0 ? 30 : 0;
        let endHr =
            parseInt(endTime.substring(0, 2)) + endTime.endsWith('PM') ? 12 : 0;
        let endMin = parseInt(endTime.substring(3, 5));
        if (endMin > 30) {
            endMin = 0;
            endHr += 1;
        } else if (endMin > 0) {
            endMin = 30;
        }
        return (endHr - startHr) * 100 + (endMin - startMin) * 50;
    }
    #timeToGridCell(DOW, startTime) {
        const DOWDom = this.#getDowDom(DOW);
        const hr = parseInt(startTime.substring(0, 2));
        const min = parseInt(startTime.substring(3, 5));
        let index;
        if (startTime.endsWith('AM')) {
            // am
            index = hr - 8;
        } else {
            // pm
            index = hr + 12;
        }
        index += min >= 30;
        console.log(hr, min, index);
        return DOWDom.children[index];
    }
}
