const cheerio = require('cheerio');
class SectionBase {
    constructor() {
        this.name = null; // L1, T1, LA1, R1
        this.id = null;
        this.type = null;
        this.dateTime = null;
        this.room = null;
        this.instructor = null;
        /**
         * @type {
         *      all: integer
         *      'department' : integer
         *      'other' : integer
         * }
         */
        this.quota = null;
        this.enrol = null;
        this.available = null;
        this.waiting = null;
        this.remarks = null;
        this.requireConcent = null;
    }
}
class Section extends SectionBase {
    constructor($Section) {
        super();
    }
    //! may contain multiple section row
    static async parseSection($Section) {
        const section = new Section($Section);
        const trCount = $Section('tr').length;
        const $tdList = [];
        $Section('tr').each((i, tr) => {
            const $tr = cheerio.load(tr, null, false);
            const tempTdList = [];
            $tr('td').each((i, td) => {
                tempTdList.push(cheerio.load(td));
            });
            $tdList.push(tempTdList);
        });
        const pr = await Promise.allSettled([
            section.#addSectionIdNameType($Section, $tdList, trCount),
            section.#addDateTime($Section, $tdList, trCount),
            section.#addRoom($Section, $tdList, trCount),
            section.#addInstructor($Section, $tdList, trCount),
            section.#addQuota($Section, $tdList, trCount),
            section.#addEnrol($Section, $tdList, trCount),
            section.#addAvailable($Section, $tdList, trCount),
            section.#addWaiting($Section, $tdList, trCount),
            section.#addRemarks($Section, $tdList, trCount),
            section.#addRequireConcent($Section, $tdList, trCount),
        ]);
        pr.forEach((el, i) => {
            if (el.reason) console.error(el.reason);
        });
        return section;
    }
    async #addSectionIdNameType($Section, $tdList, trCount) {
        const text = $tdList[0][0].text();
        const textList = text.split('(');
        this.name = textList[0].trimEnd();
        this.id = textList[1].substring(0, textList[1].length - 1);
        this.type = this.name[0];
    }
    async #addDateTime($Section, $tdList, trCount) {
        this.dateTime = [];
        for (
            let i = 0, $tdListLength = $tdList.length;
            i < $tdListLength;
            i++
        ) {
            const text = $tdList[i][1].text();
            if (text === 'TBA') {
                this.dateTime.push({
                    DOW: 'TBA',
                    startTime: 'TBA',
                    endTime: 'TBA',
                });
            } else {
                const textList = text.split(' ');
                const DOWList = (() => {
                    const DOW = textList[0];
                    const DOWList = [];
                    for (let j = 0; j < DOW.length; j += 2) {
                        DOWList.push(DOW.substring(i, i + 2));
                    }
                    return DOWList;
                })();
                const startTime = textList[1];
                const endTime = textList[3];
                for (let j = 0; j < DOWList.length; j++) {
                    this.dateTime.push({
                        DOW: DOWList[j],
                        startTime: startTime,
                        endTime: endTime,
                    });
                }
            }
        }
    }
    async #addRoom($Section, $tdList, trCount) {}
    async #addInstructor($Section, $tdList, trCount) {}
    async #addQuota($Section, $tdList, trCount) {}
    async #addEnrol($Section, $tdList, trCount) {}
    async #addAvailable($Section, $tdList, trCount) {}
    async #addWaiting($Section, $tdList, trCount) {}
    async #addRemarks($Section, $tdList, trCount) {}
    async #addRequireConcent($Section, $tdList, trCount) {
        this.requireConcent = $Section('div.popup.consent').text() !== '';
    }
}

module.exports = { Section };
