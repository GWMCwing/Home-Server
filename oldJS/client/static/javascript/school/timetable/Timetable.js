// TODO
// Swap function, delete function
// add to plan
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
        this.addHoverToTempDisplay(dom);
    }
    /** @param {HTMLelement} dom dom of the section being hover out*/
    hoverOutSelectDetail(dom) {
        dom.classList.remove('planner-detail-section-box-hover-selected');
        this.removeHoverFromTempDisplay(dom);
    }
    /** @param {HTMLElement} dom dom of the section being selected*/
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
        this.addToTempDisplay(dom);
    }
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
