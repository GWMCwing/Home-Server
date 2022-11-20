// for handling timetable display and caching
class TimetableDisplay extends TimetableBase {
    constructor() {
        super();
        this.displayingInfo = { dept: null, id: null };
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
     * display course detail to the detail div
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
    }
    /**
     *  set the state of the detail div
     * @param {Boolean} displayEnable
     * @param {String} dept
     * @param {String} id
     */
    setDetailDiv(displayEnable, dept, id) {
        if (displayEnable) {
            document.getElementById('planner-detail').style.display = 'block';
            document.getElementById(
                'planner-detail-id-name'
            ).textContent = `${dept} ${id}`;
            document.getElementById('planner-detail-name').textContent =
                this.deptList[dept][id].name;
            this.displayingInfo = { dept: dept, id: id };
            return;
        }
        //
        document.getElementById('planner-detail').style.display = 'none';
        let list = document.getElementsByClassName(
            'planner-detail-section-box-hover-selected'
        );
        for (let i = 0; i < list.length; ) {
            list[i].classList.remove(
                'planner-detail-section-box-hover-selected'
            );
        }
        list = document.getElementsByClassName(
            'planner-detail-section-box-selected'
        );
        console.log(list);
        for (let i = 0; i < list.length; ) {
            list[i].classList.remove('planner-detail-section-box-selected');
        }
        this.displayingInfo = { dept: null, id: null };
    }

    /**
     * display Section to the timetable
     * @param {String} dept
     * @param {String} id
     * @param {Section} section
     */
    displaySection(dept, id, displayDomList) {
        // display section wil multiple time slots
        for (let i = 0; i < displayDomList.length; i++) {
            const DOWDomIndex = this.getDowDomIndex(displayDomList[i].DOW);
            if (DOWDomIndex === -1) {
                continue;
            }
            const gridCellIndex = this.timeToGridCellIndex(
                displayDomList[i].startTime
            );
            this.gridDOWDom[DOWDomIndex].childNodes[gridCellIndex].appendChild(
                displayDomList[i].div
            );
        }
    }
    /**
     * add selected section in detail div to display and chosen section list
     */
    addSelectedSectionToDisplay() {
        const { dept, id } = this.displayingInfo;
        const selectedSection = document.getElementsByClassName(
            'planner-detail-section-box-selected'
        );
        if (selectedSection.length === 0) {
            return;
        }
        const chosenSectionList = [];
        Array.from(selectedSection).forEach((ele) => {
            const sectionIndex = ele.attributes['sectionIndex'].value;
            const section = this.deptList[dept][id].section[sectionIndex];
            const displayDomList = new SectionDomBuilder(
                dept,
                id,
                section
            ).build();
            chosenSectionList.push(
                new SectionDisplay(dept, id, sectionIndex, displayDomList)
            );
        });
        this.setChosenSectionList(dept, id, chosenSectionList);
    }
    addHoverToTempDisplay() {}
    updateDisplay() {
        /**
            Hovering > selected > chosen
            get all chosen section and mark them as display
            check if there is any hovering
                if there is hover
                    display the hovering sections and selected sections, mark duplicate in chosen as not-display
                if there is no hover
                    display the selected sections, mark duplicate in chosen as not-display
        */
        //  use Node.isConnected to check if the element is still in the DOM
    }
}
