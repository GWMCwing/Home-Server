// for parsing data
class TimetableBase {
    constructor() {
        this.credit = 0;
        /** @type {Course[]} */
        this.deptList = {};
        /** {dept:{id:{dept, id, chosenSectionList[ChosenSection]}}} */
        this.selected = {};
        this.inPlan = {};
        this.favorite = {};
    }
    /**
     *
     * @param {String} DOW
     * @returns index of DOW in DAY_LIST
     */
    getDowDomIndex(DOW) {
        switch (DOW) {
            case 'Mo':
                return 0;
            case 'Tu':
                return 1;
            case 'We':
                return 2;
            case 'Th':
                return 3;
            case 'Fr':
                return 4;
            case 'Sa':
                return 5;
            case 'Su':
                return 6;
            default:
                return -1;
        }
    }
    /**
     *
     * @param {String} startTime
     * @param {String} endTime
     * @returns {number} height of Dom
     */
    timeToRatio(startTime, endTime) {
        let startHr = parseInt(startTime.substring(0, 2));
        if (startHr !== 12 && startTime.endsWith('PM')) {
            startHr += 12;
        }
        const startMin = parseInt(startTime.substring(3, 5)) > 0 ? 30 : 0;
        let endHr = parseInt(endTime.substring(0, 2));
        if (endHr !== 12 && endTime.endsWith('PM')) {
            endHr += 12;
        }
        let endMin = parseInt(endTime.substring(3, 5));
        if (endMin > 30) {
            endMin = 0;
            endHr += 1;
        } else if (endMin > 0) {
            endMin = 30;
        }
        let r = (endHr - startHr) * 200 + ((endMin - startMin) / 30) * 100;
        return r;
    }
    /**
     *
     * @param {String} startTime
     * @returns {number} index of the of the dom in the grid cell DOW
     */
    timeToGridCellIndex(startTime) {
        const hr = parseInt(startTime.substring(0, 2));
        const min = parseInt(startTime.substring(3, 5));
        let index = hr - 8;
        if (startTime.endsWith('PM') && hr !== 12) {
            index += 12;
        }
        index *= 2;
        if (min > 0) {
            index += 1;
        }
        //
        return index;
    }
    /**
     *
     * @param {Section[]} sectionList
     * @returns {parsedSection[]} {sectionType: Section[]}
     */
    parseToSectionType(sectionList) {
        console.log(sectionList);
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
    /**
     *
     * @param {String} dept
     * @param {Course[]} courseList
     */
    setDeptList(dept, courseList) {
        const deptObj = {};
        for (let i = 0; i < courseList.length; i++) {
            deptObj[courseList[i].id] = new Course(courseList[i]);
        }
        this.deptList[dept] = deptObj;
    }
    setChosenSectionList(dept, id, chosenSectionList) {
        if (!this.selected[dept]) {
            this.selected[dept] = {};
        }
        if (!this.selected[dept][id]) {
            this.selected[dept][id] = { dept, id, chosenSectionList: [] };
        }
        this.selected[dept][id].chosenSectionList.push(...chosenSectionList);
    }
}
