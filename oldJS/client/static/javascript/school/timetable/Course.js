class SectionTime {
    constructor(sectionTimeJSON) {
        /** @type {DOW} */
        this.DOW = sectionTimeJSON.DOW;
        /** @type {String} */
        this.startTime = sectionTimeJSON.startTime;
        /** @type {String} */
        this.endTime = sectionTimeJSON.endTime;
    }
}
class Section {
    constructor(sectionJSON) {
        /** @type {Number} */
        this.available = sectionJSON.available;
        /** @type {SectionTime} */
        this.dateTime = sectionJSON.dateTime;
        this.dateTime.map((dateTime) => {
            new SectionTime(dateTime);
        });
        /** @type {Number} */
        this.enrol = sectionJSON.enrol;
        /** @type {String} */
        this.id = sectionJSON.id;
        /** @type {String[]} */
        this.instructor = sectionJSON.instructor;
        /** @type {String} */
        this.name = sectionJSON.name;
        /** @type {Number} */
        this.quota = sectionJSON.quota;
        /** @type {String} */
        this.remarks = sectionJSON.remarks;
        /** @type {Boolean} */
        this.requireConcent = sectionJSON.requireConcent;
        /** @type {String} */
        this.room = sectionJSON.room;
        /** @type {String} */
        this.type = sectionJSON.type;
        /** @type {Number} */
        this.waiting = sectionJSON.waiting;
    }
}
class SectionDisplay {
    constructor(dept, id, sectionIndex, displayDomList) {
        /** @type {String} */
        this.dept = dept;
        /** @type {String} */
        this.id = id;
        /** @type {Number} */
        this.sectionIndex = sectionIndex;
        /** @type {{String,String,HTMLElement}[]} DOW, startTime, div */
        this.displayDomList = displayDomList;
        /** @type {Boolean} */
        this.enabled = true;
    }
}
class Course {
    constructor(courseJSON) {
        /** @type {String} */
        this.ILO = courseJSON.ILO;
        /** @type {String} */
        this.attribute = courseJSON.attribute;
        /** @type {String} */
        this.coReq = courseJSON.coReq;
        /** @type {String} */
        this.commonCore = courseJSON.commonCore;
        /** @type {String} */
        this.courseInfo = courseJSON.courseInfo;
        /** @type {String} */
        this.dept = courseJSON.dept;
        /** @type {String} */
        this.description = courseJSON.description;
        /** @type {String} */
        this.exclusion = courseJSON.exclusion;
        /** @type {String} */
        this.id = courseJSON.id;
        /** @type {String} */
        this.matchingRequired = courseJSON.matchingRequired;
        /** @type {String} */
        this.name = courseJSON.name;
        /** @type {String} */
        this.preReq = courseJSON.preReq;
        /** @type {String} */
        this.previousCode = courseJSON.previousCode;
        /** @type {String} */
        this.requireExtraChecking = courseJSON.requireExtraChecking;
        /** @type {String} */
        this.school = courseJSON.school;
        /** @type {Course[]} */
        this.section = courseJSON.section;
        this.section.map((section) => {
            new Section(section);
        });
        /** @type {String} */
        this.semester = courseJSON.semester;
        /** @type {Number} */
        this.unit = courseJSON.unit;
    }
}
