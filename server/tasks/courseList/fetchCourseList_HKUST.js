const { CourseCollection } = require('../../database/dataBase');
const { CLL } = require('../../util/consoleLogging');
const fs = require('fs');
const { Course } = require('./Course');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
//
const threadName = 'TASKS';
// Promise reject means set the next timer in one day
// promise.resolve(true) means updated
// promise.resolve(false) means failed to fetch
function getConfig() {
    const config = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8')
    );
    return config.enable && config;
}
async function getDepartmentMap(url) {
    try {
        const { data } = await axios.get(url);
        const departmentMap = {};
        const $ = cheerio.load(data, null, false);
        $('#navigator > div.depts > a').each((i, element) => {
            const departmentInfo = {};
            departmentInfo['path'] = $(element).attr('href');
            departmentInfo['isUg'] = $(element).attr('class') === 'ug';
            departmentMap[$(element).text()] = departmentInfo;
        });
        return departmentMap;
    } catch (err) {
        CLL.error(threadName, 'Fetch Dept', err);
        return false;
    }
}
async function parseCourseInfo(elementHTML, semesterId, callback) {
    const $course = cheerio.load(elementHTML, null, false);
    const course = new Course($course, semesterId);
    await course.buildAll($course, semesterId, 'HKUST');
    callback(course);
}
async function appendToDataBase(course) {
    const query = {
        name: course.name,
        id: course.id,
        semester: course.semester,
    };
    try {
        CourseCollection.getInstance().updateDoc(query, course, {
            upsert: true,
        });
    } catch (err) {
        throw 'Unable to append to database';
    }
}
async function fetchCourseList(url, isUg) {
    const courseInfoPromise = [];
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data, null, false);
        const semesterId = url.split('/')[5];
        $('#classes > div.course').each((i, element) => {
            courseInfoPromise.push(
                parseCourseInfo($(element).html(), semesterId, appendToDataBase)
            );
        });
    } catch (err) {
        CLL.error(threadName, 'Fetch Course', err);
        return false;
    }
    const pr = await Promise.allSettled(courseInfoPromise);
    new Promise((resolve) => {
        pr.forEach((el, i) => {
            if (el.status === 'rejected')
                CLL.error(threadName, 'Parse Course', el.reason);
        });
    });
}
async function fetchAndUpdateCourseList_HKUST() {
    CLL.log(threadName, 'Fetch Update', 'Fetching CourseList');
    const config = getConfig();
    if (config === false) {
        CLL.log(threadName, 'Fetch Update', 'Fetching Course List is disabled');
        return Promise.resolve('Fetching is disabled');
    }
    const targetUrl = config.test ? config.testUrl : config.url;
    //fetch department map {departmentName: { path: url, isUg: bool}}
    const departmentMap = await getDepartmentMap(targetUrl);
    CLL.log(threadName, 'Fetch Update', 'Updating CourseList');
    const fetchPromiseList = [];
    for (const [deptName, dept] of Object.entries(departmentMap)) {
        if (config.test) {
            fetchPromiseList.push(fetchCourseList(targetUrl, true));
            break;
        } else {
            fetchPromiseList.push(
                fetchCourseList(config.baseUrl + dept.path, dept.isUg)
            );
        }
        await new Promise((resolve) => {
            setTimeout(resolve, config.sleepTime);
        });
    }
    await Promise.allSettled(fetchPromiseList);
    CLL.log(threadName, 'Fetch Update', 'Course List Update Complete');
}

module.exports = { fetchAndUpdateCourseList_HKUST };
