import { CourseBase } from '../../../../../res/type/CourseType';
import { SectionBase } from '../../../../../res/type/SectionType';
import { DomFactory } from './DomFactory.js';

// handle all DOM manipulation
type DomData = {
    dom: HTMLElement;
    data: {
        originalDisplayState: string;
    };
};
type DomLifeTime = 'HOVER' | 'SELECTED' | 'PERSISTED';
type SectionIconData = {
    data: {
        lifeTime: DomLifeTime;
    };
} & DomData;

class DisplayHandler_Cache {
    protected _mainSelectorListDom!: DomData;
    protected _deptSelectorListDom!: DomData;
    protected _courseSelectorListDom!: DomData;
    protected _backButtonDom!: DomData;
    //
    protected _timetableDom!: DomData;
    protected _plannerCourseDetailDom!: DomData;
    protected _plannerCourseSuggestionDom!: DomData;
    protected displayingSectionIcon: Map<
        string,
        Map<string, Map<string, SectionIconData[]>>
    > = new Map(); // dept -> course -> section -> icon
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
        this._plannerCourseSuggestionDom = generateDomData(
            document.getElementById(
                'planner-course-suggestion'
            ) as HTMLDivElement
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
        this.hide(this._plannerCourseSuggestionDom);
    }
    // getter
    get deptSelectorListDom() {
        return this._deptSelectorListDom.dom;
    }
    get backButtonDom() {
        return this._backButtonDom.dom;
    }
    getSectionIconDomParent(section: SectionBase): Array<HTMLDivElement> {
        const parent: Array<HTMLDivElement> = [];
        for (let i = 0; i < section.dateTimeCount; i++) {
            const startTime = section.dateTime.startTime[i];
            const vIndex = Math.floor(startTime / 30) - 8 * 2;
            const dow = section.dateTime.dayOfWeek[i];
            console.log(section);
            dow.forEach((dow) => {
                const dowIndex = this.getDOWIndex(dow);
                if (dowIndex != -1)
                    parent.push(
                        this._timetableDom.dom.children[dowIndex].children[
                            vIndex
                        ] as HTMLDivElement
                    );
            });
        }
        return parent;
    }
    isDisplayingSectionIcon(
        dept: string,
        courseCode: string,
        sectionId: string
    ): boolean {
        return (
            this.displayingSectionIcon
                .get(dept)
                ?.get(courseCode)
                ?.has(sectionId) ?? false
        );
    }

    addToDisplayingSectionIconCache(
        dept: string,
        courseCode: string,
        sectionId: string,
        dom: SectionIconData[]
    ): boolean {
        if (!this.displayingSectionIcon.has(dept)) {
            this.displayingSectionIcon.set(dept, new Map());
        }
        if (!this.displayingSectionIcon.get(dept)?.has(courseCode)) {
            this.displayingSectionIcon.get(dept)?.set(courseCode, new Map());
        }
        if (
            this.displayingSectionIcon
                .get(dept)
                ?.get(courseCode)
                ?.has(sectionId)
        )
            return false;
        this.displayingSectionIcon
            .get(dept)
            ?.get(courseCode)
            ?.set(sectionId, dom);
        return true;
    }
    removeFromDisplayingSectionIconCache(
        dept: string,
        courseCode: string,
        sectionId: string
    ): boolean {
        if (
            !this.displayingSectionIcon
                .get(dept)
                ?.get(courseCode)
                ?.has(sectionId)
        )
            return false;
        this.displayingSectionIcon
            .get(dept)
            ?.get(courseCode)
            ?.delete(sectionId);
        return true;
    }
    //
    private getDOWIndex(dow: string) {
        switch (dow) {
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
}
//
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
    displayCourseDetail(course: CourseBase) {
        this.show(this._plannerCourseDetailDom);
        this.hide(this._plannerCourseSuggestionDom);
        // remove the first child only, left alone is the button menu
        this._plannerCourseDetailDom.dom.removeChild(
            this._plannerCourseDetailDom.dom.firstChild as Node
        );
        this._plannerCourseDetailDom.dom.insertBefore(
            DomFactory.courseDetailDom(course),
            this._plannerCourseDetailDom.dom.firstChild
        );
    }
    enterHoverSection(dept: string, courseCode: string, section: SectionBase) {
        //
    }
    leaveHoverSection(dept: string, courseCode: string, section: SectionBase) {
        //
    }
    displaySectionIcon(dept: string, courseCode: string, section: SectionBase) {
        //
        if (this.isDisplayingSectionIcon(dept, courseCode, section.id)) return;
        const sectionIconDom = DomFactory.sectionIconDom(
            dept,
            courseCode,
            section
        );

        const parent = this.getSectionIconDomParent(section);
        console.log(parent);
        const domList: HTMLDivElement[] = [];
        parent.forEach((p) => {
            const sectionCopy = sectionIconDom.cloneNode(
                true
            ) as HTMLDivElement;
            p.appendChild(sectionCopy);
            domList.push(sectionCopy);
        });

        this.addToDisplayingSectionIconCache(
            dept,
            courseCode,
            section.id,
            domList.map((dom) => generateSectionIconData(dom, 'SELECTED'))
        );
    }
    removeDisplaySectionIcon(
        dept: string,
        courseCode: string,
        sectionId: string
    ) {
        if (!this.isDisplayingSectionIcon(dept, courseCode, sectionId)) return;
        const domDataList = this.displayingSectionIcon
            .get(dept)
            ?.get(courseCode)
            ?.get(sectionId);
        if (domDataList == undefined) return;
        this.removeFromDisplayingSectionIconCache(dept, courseCode, sectionId);
        domDataList.forEach((domData) => domData.dom.remove());
    }
    //
    //
}

function generateDomData(dom: HTMLElement): DomData {
    return {
        dom,
        data: {
            originalDisplayState: dom.style.display,
        },
    };
}
function generateSectionIconData(
    dom: HTMLElement,
    lifeTime: DomLifeTime
): SectionIconData {
    return {
        dom,
        data: {
            originalDisplayState: dom.style.display,
            lifeTime: lifeTime,
        },
    };
}
