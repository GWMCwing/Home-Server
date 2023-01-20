import { CourseBase } from '../../../../../res/type/CourseType';
import { SectionBase, SectionType } from '../../../../../res/type/SectionType';
import { asStringList } from './common.js';
import { Timetable } from './timetable.js';
//
export class DomFactory {
    static courseDom_selectorList(course: CourseBase): HTMLLIElement {
        return _LeftPanelDomFactory.courseDom_selectorList(course);
    }
    static courseDetailDom(course: CourseBase): HTMLDivElement {
        return _CourseDetailDomFactory.courseDetailDom(course);
    }
}

//
class _LeftPanelDomFactory {
    static courseDom_selectorList(course: CourseBase): HTMLLIElement {
        /**
         * <li class="course">
         *      <div class="course-id">COMP 1021</div>
         *      <div class="course-name">Introduction to Computer Science</div>
         *      <div class="course-credit">3 credits</div>
         * </li>
         */
        const courseDom = document.createElement('li');
        courseDom.classList.add('course');
        const courseIdDom = document.createElement('div');
        courseIdDom.classList.add('course-id');
        const courseNameDom = document.createElement('div');
        courseNameDom.classList.add('course-name');
        const courseCreditDom = document.createElement('div');
        courseCreditDom.classList.add('course-credit');
        //
        // courseDom.appendChild(courseInfoDom);
        courseDom.appendChild(courseIdDom);
        courseDom.appendChild(courseCreditDom);
        courseDom.appendChild(courseNameDom);
        //
        courseIdDom.textContent = `${course.dept} ${course.id}`;
        courseNameDom.textContent = course.name;
        courseCreditDom.textContent = `${course.credit} credits`;
        //
        courseDom.onclick = function () {
            Timetable.getInstance().selectCourse(course.dept, course.id);
        };
        return courseDom;
    }
}
//
class _CourseDetailDomFactory {
    static _createCourseDetailTitleDom(course: CourseBase): HTMLDivElement {
        /**
                <div id="planner-course-detail-title-container">
         *          <span class="id-name" id="planner-course-detail-id-name">
         *          <span class="name" id="planner-course-detail-name">
         *          <span class="tag" id="planner-course-detail-tag">
         *      </div>
         */
        const courseDetailTitleContainer = document.createElement('div');
        courseDetailTitleContainer.id = 'planner-course-detail-title-container';
        //
        const courseDetailIdName = document.createElement('span');
        courseDetailIdName.classList.add('id-name');
        courseDetailIdName.id = 'planner-course-detail-id-name';
        const courseDetailName = document.createElement('span');
        courseDetailName.classList.add('name');
        courseDetailName.id = 'planner-course-detail-name';
        const courseDetailTag = document.createElement('span');
        courseDetailTag.classList.add('tag');
        courseDetailTag.id = 'planner-course-detail-tag';
        //
        courseDetailTitleContainer.appendChild(courseDetailIdName);
        courseDetailTitleContainer.appendChild(courseDetailName);
        courseDetailTitleContainer.appendChild(courseDetailTag);
        //
        courseDetailIdName.textContent = `${course.dept} ${course.id}`;
        courseDetailName.textContent = course.name;
        // courseDetailTag.textContent = 'TAG';
        courseDetailTag.textContent = '';
        //
        return courseDetailTitleContainer;
    }
    static _sectionBoxDom(section: SectionBase): HTMLDivElement {
        console.log(
            'Creating section box dom',
            JSON.stringify(section, null, 2)
        );
        /**
         * <div class="section-box">
         *      <div class="section-id">L01</div>
         *      <div class = "dateTime-container">
         *          <div class="section-time">MWF 9:30-10:20</div>
         *          <div class="section-time">Tu 9:30-10:20</div>
         *      </div>
         * </div>
         */
        const sectionBox = document.createElement('div');
        sectionBox.classList.add('section-box');
        //
        const sectionDateTimeContainer = document.createElement('div');
        sectionDateTimeContainer.classList.add('dateTime-container');
        const sectionId = document.createElement('div');
        sectionId.classList.add('section-id');

        //
        sectionId.textContent = `${section.type}${section.name}`;
        // console.log('dateTime');
        // console.log(section);
        // console.log(section.dateTime);
        const dateTimeList = asStringList(section.dateTime);
        for (let i = 0; i < dateTimeList.length; i++) {
            const dateTime = dateTimeList[i];
            const sectionTimeDom = document.createElement('div');
            sectionTimeDom.classList.add('section-time');
            sectionTimeDom.textContent = dateTime;
            sectionDateTimeContainer.appendChild(sectionTimeDom);
        }

        //
        sectionBox.appendChild(sectionId);
        sectionBox.appendChild(sectionDateTimeContainer);
        //
        return sectionBox;
    }
    static _createSectionBoxDom(
        sectionList: SectionBase[],
        type: SectionType
    ): HTMLDivElement {
        console.log('Creating section box dom of type: ', type);
        /**
         * <div class="section-box-container" type=SectionType>
         *     <div class="section-box">
         *     <div class="section-box">
         *     ...
         * </div>
         */
        //
        const sectionBoxContainer = document.createElement('div');
        sectionBoxContainer.classList.add('section-box-container');
        sectionBoxContainer.setAttribute('type', type);
        //
        for (let i = 0; i < sectionList.length; i++) {
            const section = sectionList[i];
            const sectionBox = this._sectionBoxDom(section);
            sectionBoxContainer.appendChild(sectionBox);
        }
        return sectionBoxContainer;
    }
    static _createCourseDetailBoxContainerDom(
        course: CourseBase
    ): HTMLDivElement {
        /**
         * <div class="detail-box-container" id="planner-course-detail-box-container">
         *     <div class="section-box-container"> // order: lecture, tutorial, lab, R
         *     ...
         * </div>
         *
         */
        const courseDetailBoxContainer = document.createElement('div');
        courseDetailBoxContainer.classList.add('detail-box-container');
        courseDetailBoxContainer.id = 'planner-course-detail-box-container';
        //
        const sectionList = course.sectionList;
        let sectionType: SectionType | null = null;
        let sectionList_type: SectionBase[] = [];
        // console.log(sectionList);
        for (let i = 0; i < sectionList.length; i++) {
            const section = sectionList[i];
            // console.log(JSON.stringify(section.id, null, 2));
            if (sectionType === null) {
                sectionType = section.type;
            } else if (section.type !== sectionType) {
                const sectionBoxContainerDom = this._createSectionBoxDom(
                    sectionList_type,
                    sectionType
                );
                courseDetailBoxContainer.appendChild(sectionBoxContainerDom);
                sectionType = section.type;
                sectionList_type = [];
            }
            sectionList_type.push(section);
        }
        if (sectionType !== null) {
            const sectionBoxContainerDom = this._createSectionBoxDom(
                sectionList_type,
                sectionType
            );
            courseDetailBoxContainer.appendChild(sectionBoxContainerDom);
        }
        //
        return courseDetailBoxContainer;
    }

    static courseDetailDom(course: CourseBase) {
        /**
         * <div class="course-detail-container">
         *     <div id="planner-course-detail-title-container"> // done in createCourseDetailTitleDom
         *      <div class="detail-box-container" id="planner-course-detail-box-container"> // done in createCourseDetailBoxContainerDom
         * </div>
         *
         */
        const courseDetailContainer = document.createElement('div');
        courseDetailContainer.classList.add('course-detail-container');
        //
        const courseDetailTitleContainer =
            this._createCourseDetailTitleDom(course);
        //
        const courseDetailBoxContainer =
            this._createCourseDetailBoxContainerDom(course);
        //
        courseDetailContainer.appendChild(courseDetailTitleContainer);
        courseDetailContainer.appendChild(courseDetailBoxContainer);
        //
        return courseDetailContainer;
    }
}
