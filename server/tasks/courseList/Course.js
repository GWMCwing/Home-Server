const { CCProperty, CCType } = require('./CCType');
const { Section } = require('./Section');
const cheerio = require('cheerio');
class CourseBase {
    constructor() {
        this.dept = null;
        this.id = null;
        this.name = null;
        this.unit = null;
        //
        this.section = null;
        //
        this.attribute = null;
        this.description = null;
        this.matchingRequired = null;
        this.courseInfo = null;
        //
        this.preReq = null;
        this.coReq = null;
        this.exclusion = null;
        //
        this.semester = null;
        this.previousCode = null;
        this.commonCore = null;
        //
        this.ILO = null;
        //
        this.requireExtraChecking = false;
    }
}
class Course extends CourseBase {
    constructor($Course, semesterId) {
        super();
    }
    async buildAll($Course, semesterId) {
        await Promise.allSettled([
            this.#addSemester(semesterId),
            this.#addNameIdUnitInfo($Course),
            this.#addCourseInfo($Course),
            this.#addSection($Course),
        ]);
        // this.section.forEach((el, i) => {
        //     console.log(el.dateTime);
        // });
    }
    #addSemester(semesterId) {
        this.semester = semesterId;
    }
    async #addNameIdUnitInfo($Course) {
        /** @type {Array} */
        const courseNameInfoText = $Course('h2').text().split(' ');
        this.dept = courseNameInfoText[0];
        this.id = courseNameInfoText[1];
        this.name = courseNameInfoText.slice(3, -2).join(' ');
        this.unit = courseNameInfoText.slice(-2)[0].slice(1);
        const tempUnit = parseInt(this.unit);
        if (tempUnit !== NaN) {
            this.unit = tempUnit;
            return Promise.resolve();
        } else {
            console.error(`cannot parse unit to int: ${courseName} ${unit}`);
            return Promise.reject();
        }
    }
    async #addCourseInfo($Course) {
        const $CourseInfo = cheerio.load(
            $Course('div.courseinfo').html(),
            null,
            false
        );
        await Promise.allSettled([
            this.#addAttribute($CourseInfo),
            this.#addVector($CourseInfo),
            this.#addDescription($CourseInfo),
            this.#addMatchingRequired($CourseInfo),
            this.#addPreReq($CourseInfo),
            this.#addCoReq($CourseInfo),
            this.#addExclusion($CourseInfo),
            this.#addCoList($CourseInfo),
            this.#addPreviousCode($CourseInfo),
            this.#addCommonCore($CourseInfo),
            this.#addILO($CourseInfo),
        ]);
    }
    async #addAttribute($CourseInfo) {}
    async #addVector($CourseInfo) {}
    async #addDescription($CourseInfo) {}
    async #addMatchingRequired($CourseInfo) {
        this.matchingRequired = $CourseInfo('div.matching').text() !== '';
        return this;
    }
    // special have "OR" "/" and "AND" and "DDP only" and "Other" (LANG 4033)
    async #addPreReq($CourseInfo) {}
    // special have "OR" and "AND", without preReq
    async #addCoReq($CourseInfo) {}
    // AL pure or AL Applied
    async #addCoList($CourseInfo) {}
    async #addExclusion($CourseInfo) {}
    async #addPreviousCode($CourseInfo) {}
    async #addCommonCore($CourseInfo) {}
    //
    async #addILO($courseInfo) {}
    //
    async #addSection($Course) {
        const $SectionTable = cheerio.load(
            $Course('table.sections').html(),
            null,
            false
        );
        const sectionPromise = [];
        const sectionTrList = $SectionTable('tr').slice(1);
        let tempSectionHTML = '';
        sectionTrList.each((i, element) => {
            let $element = $SectionTable(element);
            // newsect means a start of a section, without newsect means another time for the section
            if ($element.attr('class').includes('newsect')) {
                if (tempSectionHTML !== '') {
                    sectionPromise.push(
                        Section.parseSection(
                            cheerio.load(tempSectionHTML, null, false)
                        )
                    );
                }
                tempSectionHTML = '<tr>' + $element.html() + '</tr>';
            } else {
                // join two html and load afterward
                tempSectionHTML += '<tr>' + $element.html() + '</tr>';
            }
        });
        sectionPromise.push(
            Section.parseSection(cheerio.load(tempSectionHTML, null, false))
        );
        // use Promise.allSettled
        this.section = await Promise.allSettled(sectionPromise);
        this.section = this.section.map((promise, index) => {
            if (promise.status === 'rejected') {
                console.error(promise.reason);
                return false;
            } else {
                return promise.value;
            }
        });
        return true;
    }
    //
    #requireExtraChecking() {
        this.requireExtraChecking = true;
    }
}
module.exports = { Course };
