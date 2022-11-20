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
            const type = HKUST_TYPE_LIST[i];
            if (parsedSectionList[type]) {
                // display section
                const sectionList = parsedSectionList[type];
                const sectionTypeBox = document.createElement('div');
                sectionTypeBox.classList.add('planner-detail-type-box');
                for (let j = 0; j < sectionList.length; j++, index++) {
                    const section = sectionList[j];
                    const sectionBox = DetailDomBuilder.buildDetailSectionBox(
                        timetable,
                        dept,
                        id,
                        section,
                        type,
                        j,
                        index
                    );
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
    static buildDetailSectionBox(timetable, dept, id, section, type, j, index) {
        const sectionBox = document.createElement('div');
        sectionBox.className = 'planner-detail-section-box';
        sectionBox.setAttribute('sectionIndex', index);
        sectionBox.setAttribute('sectionType', type);
        if (j === 0) {
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
            sectionTime.classList.add(
                'planner-detail-section-sub-box-time-multi'
            );
        }
        sectionTime.textContent = `${dateTime.DOW} ${dateTime.startTime} - ${dateTime.endTime}`;
        //
        return sectionTime;
    }
}

class SectionDomBuilder extends TimetableBase {
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
