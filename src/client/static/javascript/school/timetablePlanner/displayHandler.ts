import { CourseBase } from '../../../../../res/type/CourseType';

// handle all DOM manipulation
type DomData = {
    dom: HTMLElement;
    data: {
        originalDisplayState: string;
    };
};

class DisplayHandler_Cache {
    protected _mainSelectorListDom!: DomData;
    protected _deptSelectorListDom!: DomData;
    protected _courseSelectorListDom!: DomData;
    protected _backButtonDom!: DomData;
    //
    protected _timetableDom!: DomData;
    protected _plannerCourseDetailDom!: DomData;
    constructor() {
        this.initDomCache();
        this.initDomDisplay();
    }
    initDomCache() {
        this._backButtonDom = generateDomData(
            document.getElementById(
                'course-list-container-back-button'
            ) as HTMLDivElement
        );
        //
        this._timetableDom = generateDomData(
            document.getElementById('timetable-grid') as HTMLDivElement
        );

        this._mainSelectorListDom = generateDomData(
            document.getElementById('main-selector-list') as HTMLDivElement
        );

        this._deptSelectorListDom = generateDomData(
            document.getElementById('dept-selector-list') as HTMLDivElement
        );

        this._courseSelectorListDom = generateDomData(
            document.getElementById('course-selector-list') as HTMLDivElement
        );
        this._plannerCourseDetailDom = generateDomData(
            document.getElementById('planner-course-detail') as HTMLDivElement
        );
    }
    hide(dom: DomData) {
        dom.dom.style.display = 'none';
    }
    show(dom: DomData) {
        dom.dom.style.display = dom.data.originalDisplayState;
    }
    initDomDisplay() {
        this.hide(this._backButtonDom);
        this.hide(this._courseSelectorListDom);
        this.hide(this._plannerCourseDetailDom);
    }
    // getter
    get deptSelectorListDom() {
        return this._deptSelectorListDom.dom;
    }
    get backButtonDom() {
        return this._backButtonDom.dom;
    }
}
export class DisplayHandler extends DisplayHandler_Cache {
    constructor() {
        super();
    }
    displayBackButton_leftPanel() {
        this.show(this._backButtonDom);
    }
    hideBackButton_leftPanel() {
        this.hide(this._backButtonDom);
        this.show(this._mainSelectorListDom);
        this.show(this._deptSelectorListDom);
        this.hide(this._courseSelectorListDom);
    }
    displayCourseList(courseList: CourseBase[]) {
        //
        this.hide(this._mainSelectorListDom);
        this.hide(this._deptSelectorListDom);
        this.show(this._courseSelectorListDom);
        this._courseSelectorListDom.dom.innerHTML = '';
        this.displayBackButton_leftPanel();
        //
        courseList.forEach((course) => {
            this._courseSelectorListDom.dom.appendChild(
                DomFactory.courseDom_selectorList(course)
            );
        });
    }
}

function generateDomData(dom: HTMLElement): DomData {
    return {
        dom,
        data: {
            originalDisplayState: dom.style.display,
        },
    };
}
class DomFactory {
    static courseDom_selectorList(course: CourseBase): HTMLLIElement {
        const courseDom = document.createElement('li');
        courseDom.classList.add('course');
        const courseIdDom = document.createElement('div');
        courseIdDom.classList.add('course-id');
        const courseNameDom = document.createElement('div');
        courseNameDom.classList.add('course-name');
        const courseCreditDom = document.createElement('div');
        courseCreditDom.classList.add('course-credit');
        //
        courseDom.appendChild(courseIdDom);
        courseDom.appendChild(courseCreditDom);
        courseDom.appendChild(courseNameDom);
        //
        courseIdDom.textContent = `${course.dept} ${course.id}`;
        courseNameDom.textContent = course.name;
        courseCreditDom.textContent = `${course.credit} credits`;
        return courseDom;
    }
}
