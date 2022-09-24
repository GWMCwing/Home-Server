// TODO
// Swap function, delete function
// add to plan
//
// for parsing data
class TimetableBase {
    constructor() {
        this.credit = 0;
        /** {dept: {courseId: course}} */
        this.deptList = {};
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
                return false;
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
        const tempObj = {};
        for (let i = 0; i < courseList.length; i++) {
            tempObj[courseList[i].id] = courseList[i];
        }
        this.deptList[dept] = tempObj;
    }
}
// for handling timetable display and caching
class TimetableDisplay extends TimetableBase {
    constructor() {
        super();
        this.displayingInfo = { dept: null, id: null };
        // TODO factorize section and element, section contain elements of the section
        /** {dept:{id:{dept, id, choseSection[Section], elementList[HTMLElement]}}} */
        this.selected = {};
        // TODO factorize section and element, section contain elements of the section
        /** {dept:{id:{dept, id, choseSection[Section], elementList[HTMLElement]}}} */
        this.disabled = {};
        /** {dept:{id:{dept, id, choseSection[Section], elementList[HTMLElement]}} */
        this.tempDisplay = {};
        /** @type {HTMLElement[]}*/
        this.gridDOWDom = [];
        /** @type {HTMLElement} */
        this.detailDiv;
        /** @type {HTMLElement} */
        this.suggestionDiv;
    }
    /**
     *
     * @param {String} dept
     * @param {String} id
     */
    displayCourseDetail(dept, id) {
        const sectionList = this.deptList[dept][id].section;
        const parsedSectionList = this.parseToSectionType(sectionList);
        // display title and credits
        this.setDetailDiv(true, dept, id);
        this.displayingInfo = { dept: dept, id: id };
        // wrapper for sections
        const detailBox = document.getElementById('planner-detail-box-container');
        detailBox.innerHTML = '';
        DetailDomBuilder.buildDetailBox(this, 'HKUST', dept, id, parsedSectionList).forEach((ele) => {
            detailBox.appendChild(ele);
        });
    }
    /**
     *
     * @param {Boolean} displayEnable
     * @param {String} dept
     * @param {String} id
     */
    setDetailDiv(displayEnable, dept, id) {
        if (displayEnable) {
            document.getElementById('planner-detail').style.display = 'block';
            document.getElementById('planner-detail-id-name').textContent = `${dept} ${id}`;
            document.getElementById('planner-detail-name').textContent = this.deptList[dept][id].name;
            this.displayingInfo = { dept: dept, id: id };
            return;
        }
        //
        document.getElementById('planner-detail').style.display = 'none';
        let list = document.getElementsByClassName('planner-detail-section-box-hover-selected');
        for (let i = 0; i < list.length; ) {
            list[i].classList.remove('planner-detail-section-box-hover-selected');
        }
        list = document.getElementsByClassName('planner-detail-section-box-selected');
        console.log(list);
        for (let i = 0; i < list.length; ) {
            list[i].classList.remove('planner-detail-section-box-selected');
        }
        this.displayingInfo = { dept: null, id: null };
    }

    /**
     *
     * @param {String} dept
     * @param {String} id
     */
    displaySection(dept, id, section) {
        const displayDomList = new sectionDomBuilder(dept, id, section).build();
        // display section wil multiple time slots
        for (let i = 0; i < displayDomList.length; i++) {
            const DOWDomIndex = this.getDowDomIndex(displayDomList[i].DOW);
            const gridCellIndex = this.timeToGridCellIndex(displayDomList[i].startTime);
            this.gridDOWDom[DOWDomIndex].childNodes[gridCellIndex].appendChild(displayDomList[i].div);
        }
        return displayDomList;
    }
    addToSelected() {
        const selectedSectionList = document.getElementsByClassName('planner-detail-section-box-selected');
        const { dept, id } = this.displayingInfo;
        const sectionDomList = [];
        const sectionList = [];
        // add to selected and display on timetable
        for (let i = 0; i < selectedSectionList.length; i++) {
            const sectionIndex = selectedSectionList[i].attributes['sectionIndex'].value;
            const section = this.deptList[dept][id].section[sectionIndex];
            sectionList.push(section);
            sectionDomList.push(...this.displaySection(dept, id, section));
        }
        // TODO factorize
        if (!this.selected[dept]) {
            this.selected[dept] = {};
        }
        if (!this.selected[dept][id]) {
            this.selected[dept][id] = {
                dept: dept,
                id: id,
                choseSection: [],
                elementList: [],
            };
        }
        // push div and section list to section in this.selected
        this.selected[dept][id].choseSection.push(...sectionList);
        this.selected[dept][id].elementList.push(...sectionDomList);
    }
    removeFromSelected(dom) {}
    swapSelected(dom) {}
    addToTempDisplay(dom) {}
    removeFromTempDisplay(dom) {}
}
// for handling user input and timetable generation
class Timetable extends TimetableDisplay {
    constructor() {
        super();
        this.#setup();
    }
    /**
     *
     * @param {String} dept
     * @param {String} id
     */
    selectCourseToDisplay(dept, id) {
        this.displayCourseDetail(dept, id);
    }
    /** @param {HTMLelement} dom dom of the section being hover in*/
    hoverInSelectDetail(dom) {
        dom.classList.add('planner-detail-section-box-hover-selected');
        this.addToTempDisplay(dom);
    }
    /** @param {HTMLelement} dom dom of the section being hover out*/
    hoverOutSelectDetail(dom) {
        dom.classList.remove('planner-detail-section-box-hover-selected');
        this.removeFromTempDisplay(dom);
    }
    /** @param {HTMLElement} dom dom of the section being selected*/
    selectDetailSection(dom) {
        const previousSelected = dom.parentElement.getElementsByClassName('planner-detail-section-box-selected')[0];
        if (previousSelected) {
            previousSelected.classList.remove('planner-detail-section-box-selected');
        }
        dom.classList.add('planner-detail-section-box-selected');
        this.addToTempDisplay(dom);
    }
    /**
     *
     * @param {Section[]} sectionList
     */
    #isAllConflict(sectionList) {}
    /**
     *
     * @param {Section} section
     */
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
class DetailDomBuilder {
    /**
     *
     * @param {Timetable} timetable
     * @param {String} school
     * @param {String} dept
     * @param {String} id
     * @param {Section[]} parsedSectionList
     * @returns {HTMLElement} detailBox dom
     */
    static buildDetailBox(timetable, school, dept, id, parsedSectionList) {
        // HKUST [L,T,LA,R] CUHK???
        const HKUST_TYPE_LIST = ['L', 'T', 'LA', 'R'];
        const detailBoxChild = [];
        let index = 0;
        for (let i = 0; i < HKUST_TYPE_LIST.length; i++) {
            if (parsedSectionList[HKUST_TYPE_LIST[i]]) {
                // display section
                const sectionList = parsedSectionList[HKUST_TYPE_LIST[i]];
                const sectionTypeBox = document.createElement('div');
                sectionTypeBox.classList.add('planner-detail-type-box');
                for (let j = 0; j < sectionList.length; j++, index++) {
                    const section = sectionList[j];
                    const sectionBox = DetailDomBuilder.buildDetailSectionBox(timetable, dept, id, section, j, index);
                    sectionTypeBox.appendChild(sectionBox);
                }
                detailBoxChild.push(sectionTypeBox);
            }
        }
        return detailBoxChild;
    }
    /**
     *
     * @param {Timetable} timetable
     * @param {String} dept
     * @param {String} id
     * @param {String} section
     * @param {Number} j
     * @returns {HTMLElement} sectionBox dom
     */
    static buildDetailSectionBox(timetable, dept, id, section, j, index) {
        const sectionBox = document.createElement('div');
        sectionBox.className = 'planner-detail-section-box';
        sectionBox.setAttribute('sectionIndex', index);
        if (j === 0) {
            sectionBox.classList.add('planner-detail-section-box-selected');
        }
        //
        const sectionType = DetailDomBuilder.buildDetailSectionType(section);
        sectionBox.appendChild(sectionType);
        //
        for (let k = 0; k < section.dateTime.length; k++) {
            const sectionTime = DetailDomBuilder.buildDetailSectionTime(section, k);
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
    /**
     *
     * @param {Section} section
     * @returns {HTMLElement} sectionType dom
     */
    static buildDetailSectionType(section) {
        const sectionType = document.createElement('div');
        sectionType.className = 'planner-detail-section-sub-box-title';
        sectionType.textContent = section.name;
        return sectionType;
    }
    /**
     *
     * @param {Section} section
     * @param {Number} k
     * @returns {HTMLElement} sectionTime dom
     */
    static buildDetailSectionTime(section, k) {
        const dateTime = section.dateTime[k];
        const sectionTime = document.createElement('div');
        sectionTime.className = 'planner-detail-section-sub-box-time';
        if (k > 0) {
            sectionTime.classList.add('planner-detail-section-sub-box-time-multi');
        }
        sectionTime.textContent = `${dateTime.DOW} ${dateTime.startTime} - ${dateTime.endTime}`;
        //
        return sectionTime;
    }
}

class sectionDomBuilder extends TimetableBase {
    /**
     *
     * @param {String} dept
     * @param {String} id
     * @param {Section} section
     */
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
    /**
     *
     * @param {Section} section
     * @param {Number} dateTimeCount
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
            timeDom.textContent = section.dateTime[i].startTime + ' - ' + section.dateTime[i].endTime;
            const startTime = section.dateTime[i].startTime;
            const endTime = section.dateTime[i].endTime;
            outerDiv.style.maxHeight = this.timeToRatio(startTime, endTime) + '%';
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
