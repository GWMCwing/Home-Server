class DetailDomBuilder {
    static buildDetailBox(timetable, school, dept, id, parsedSectionList) {
        // HKUST [L,T,LA,R] CUHK???
        let HKUST_TYPE_LIST = ['L', 'T', 'LA', 'R'];
        const detailBoxChild = [];
        for (let i = 0; i < HKUST_TYPE_LIST.length; i++) {
            if (parsedSectionList[HKUST_TYPE_LIST[i]]) {
                // display section
                const sectionList = parsedSectionList[HKUST_TYPE_LIST[i]];
                const sectionTypeBox = document.createElement('div');
                sectionTypeBox.classList.add('planner-detail-type-box');
                for (let j = 0; j < sectionList.length; j++) {
                    const section = sectionList[j];
                    const sectionBox = DetailDomBuilder.buildDetailSectionBox(
                        timetable,
                        dept,
                        id,
                        section,
                        j
                    );
                    sectionTypeBox.appendChild(sectionBox);
                }
                detailBoxChild.push(sectionTypeBox);
            }
        }
        return detailBoxChild;
    }
    static buildDetailSectionBox(timetable, dept, id, section, j) {
        const sectionBox = document.createElement('div');
        sectionBox.className = 'planner-detail-section-box';
        if (j == 0) {
            sectionBox.classList.add('planner-detail-section-box-selected');
        }
        //
        const sectionType = DetailDomBuilder.buildDetailSectionType(section);
        sectionBox.appendChild(sectionType);
        //
        for (let k = 0; k < section.dateTime.length; k++) {
            const sectionTime = DetailDomBuilder.buildDetailSectionTime(
                section,
                k
            );
            sectionBox.appendChild(sectionTime);
        }
        // on hover
        sectionBox.onmouseenter = () => {
            timetable.hoverInSelectDetail(sectionBox);
        };
        sectionBox.onmouseleave = () => {
            timetable.hoverOutSelectDetail(sectionBox);
        };
        // on click
        sectionBox.onclick = () => {
            timetable.selectDetailSection(sectionBox);
        };
        return sectionBox;
    }
    static buildDetailSectionType(section) {
        const sectionType = document.createElement('div');
        sectionType.className = 'planner-detail-section-sub-box-title';
        sectionType.textContent = section.name;
        return sectionType;
    }
    static buildDetailSectionTime(section, k) {
        const dateTime = section.dateTime[k];
        const sectionTime = document.createElement('div');
        sectionTime.className = 'planner-detail-section-sub-box-time';
        if (k > 0) {
            sectionTime.classList.add(
                'planner-detail-section-sub-box-time-multi'
            );
        }
        sectionTime.textContent = `${dateTime.startTime} - ${dateTime.endTime}`;
        //
        return sectionTime;
    }
}
class TimetableBase {
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
                return false;
        }
    }
    timeToRatio(startTime, endTime) {
        const startHr =
            parseInt(startTime.substring(0, 2)) +
            (startTime.endsWith('PM') ? 12 : 0);
        const startMin = parseInt(startTime.substring(3, 5)) > 0 ? 30 : 0;
        let endHr =
            parseInt(endTime.substring(0, 2)) +
            (endTime.endsWith('PM') ? 12 : 0);
        let endMin = parseInt(endTime.substring(3, 5));
        if (endMin > 30) {
            endMin = 0;
            endHr += 1;
        } else if (endMin > 0) {
            endMin = 30;
        }
        console.log(startHr, startMin, endHr, endMin);
        return (endHr - startHr) * 100 + ((endMin - startMin) * 5) / 3;
    }
    timeToGridCellIndex(startTime) {
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
        return index;
    }
}
class Timetable extends TimetableBase {
    constructor() {
        super();
        this.credit = 0;
        this.deptList = {};
        this.inPlan = {}; // {dept:{id:{dept, id}}}
        this.inGrid = {}; // {dept:{id:{dept, id, choseSection[], elementList[]}}}
        this.favorite = {}; // {dept:{id:{dept,id}}}
        this.tempDisplay = {}; // {dept:{id:{dept, id, choseSection[], elementList[]}}
        this.gridDOWDom = [];
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
        this.displayCourseDetail(dept, id);
    }
    #setDetailDiv(displayEnable, dept, id) {
        if (displayEnable) {
            document.getElementById('planner-detail').style.display = 'block';
        } else {
            document.getElementById('planner-detail').style.display = 'none';
            return;
        }
        document.getElementById(
            'planner-detail-id-name'
        ).textContent = `${dept} ${id}`;
        document.getElementById('planner-detail-name').textContent =
            this.deptList[dept][id].name;
    }
    displayCourseDetail(dept, id) {
        const sectionList = this.deptList[dept][id].section;
        const parsedSectionList = this.#parseToSectionType(sectionList);
        // display title and credits
        this.#setDetailDiv(true, dept, id);
        // wrapper for sections
        const detailBox = document.getElementById(
            'planner-detail-box-container'
        );
        detailBox.innerHTML = '';
        DetailDomBuilder.buildDetailBox(
            this,
            'HKUST',
            dept,
            id,
            parsedSectionList
        ).forEach((ele) => {
            detailBox.appendChild(ele);
        });
        this.updateTempDisplay();
    }
    hoverInSelectDetail(dom) {
        dom.classList.add('planner-detail-section-box-hover-selected');
        this.updateTempDisplay();
    }
    hoverOutSelectDetail(dom) {
        dom.classList.remove('planner-detail-section-box-hover-selected');
        this.updateTempDisplay();
    }
    /**
     *
     * @param {HTMLElement} dom
     */
    selectDetailSection(dom) {
        const previousSelected = dom.parentElement.getElementsByClassName(
            'planner-detail-section-box-selected'
        )[0];
        if (previousSelected) {
            previousSelected.classList.remove(
                'planner-detail-section-box-selected'
            );
        }
        dom.classList.add('planner-detail-section-box-selected');
        this.updateTempDisplay();
    }
    updateTempDisplay() {
        // remove tempDisplay DOM
        // restore inGrid
        // get hover-selected section
        // get all selected sections except type in hover-selected section
        // add to tempDisplay
        // remove from inGrid
    }
    #addToInGrid(dept, id, sectionList) {}
    // tempSelectSection(dom, dept, id) {}
    #displaySectionTEST(dept, id) {
        //! test only
        const sectionList = this.deptList[dept][id].section;
        const displayDomList = new sectionDomBuilder(
            dept,
            id,
            sectionList[0]
        ).build();
        this.gridDOWDom[this.getDowDomIndex(displayDomList[0].DOW)].childNodes[
            this.timeToGridCellIndex(displayDomList[0].startTime)
        ].appendChild(displayDomList[0].div);
    }
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
            this.gridDOWDom.push(gridDom.children[i]);
        }
        this.detailDiv = document.getElementById('planner-detail');
        this.suggestionDiv = document.getElementById('planner-suggestion');
        this.detailDiv.style.display = 'none';
        this.suggestionDiv.style.display = 'none';
    }
}

class sectionDomBuilder extends TimetableBase {
    static baseDom = null;
    constructor(dept, id, section) {
        super();
        this.dept = dept;
        this.id = id;
        this.sectionDom = [];
        this.#createSectionDomClass(section, section.dateTime.length);
    }
    #createBaseDom() {
        const outerDiv = document.createElement('div');
        outerDiv.className = 'section-outer';
        const innerDiv = document.createElement('div');
        innerDiv.className = 'section-inner';
        // title
        const titleDom = document.createElement('p');
        titleDom.className = 'section-title';
        // TypeNum
        const typeNumDom = document.createElement('p');
        // id
        const idDom = document.createElement('p');
        // time
        const timeDom = document.createElement('p');
        timeDom.className = 'section-time';
        //
        innerDiv.appendChild(titleDom);
        innerDiv.appendChild(typeNumDom);
        innerDiv.appendChild(idDom);
        innerDiv.appendChild(timeDom);
        //
        outerDiv.appendChild(innerDiv);
        return outerDiv;
    }
    /*
        .section-outer
            .section-inner
                p.section-title
                p.section-typeNum
                p.section-id
                p.section-time
     */
    #createSectionDomClass(section, dateTimeCount) {
        for (let i = 0; i < dateTimeCount; i++) {
            const outerDiv = this.#createBaseDom();
            const innerDiv = outerDiv.children[0];
            const titleDom = innerDiv.children[0];
            const typeNumDom = innerDiv.children[1];
            const idDom = innerDiv.children[2];
            const timeDom = innerDiv.children[3];
            //
            outerDiv.setAttribute('dept', this.dept);
            outerDiv.setAttribute('id', this.id);
            // title
            titleDom.textContent = this.dept + ' ' + this.id;
            // TypeNum
            typeNumDom.textContent = section.name;
            // id
            idDom.textContent = '(' + section.id + ')';
            // time
            timeDom.textContent =
                section.dateTime[i].startTime +
                ' - ' +
                section.dateTime[i].endTime;
            const startTime = section.dateTime[i].startTime;
            const endTime = section.dateTime[i].endTime;
            outerDiv.style.maxHeight =
                this.timeToRatio(startTime, endTime) + '%';
            //
            const DOW = section.dateTime[i].DOW;
            this.sectionDom.push({
                DOW: DOW,
                startTime: startTime,
                div: outerDiv,
            });
        }
    }
    build() {
        return this.sectionDom;
    }
}
