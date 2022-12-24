import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { load } from 'cheerio';
import { courseCollection } from '../../database/databaseInterface';
import { CLL } from '../../util/consoleLogging';
import { generate_HKUST_Course, HKUST_Course } from './Course_HKUST';
import { courseList_config } from '../task_config';
//
const threadName = 'TASKS';

//TODO
export interface DepartmentInfo {
    path: string;
    isUg: boolean;
}
export interface DepartmentMap extends Record<string, unknown> {
    [key: string]: DepartmentInfo;
}
// Promise reject means set the next timer in one day
// promise.resolve(true) means updated
// promise.resolve(false) means failed to fetch
function getConfig() {
    // const config = JSON.parse(
    //     fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8')
    // );
    // return config.enable && config;
    return courseList_config.enable && courseList_config;
}
async function getDepartmentMap(url: string) {
    try {
        const { data } = await axios.get(url);
        const departmentMap: DepartmentMap = {};
        const $ = load(data, null, false);
        $('#navigator > div.depts > a').each((i, element) => {
            const departmentInfo: DepartmentInfo = {
                path: $(element).attr('href') as string,
                isUg: $(element).attr('class') === 'ug',
            };
            departmentMap[$(element).text()] = departmentInfo;
        });
        return departmentMap;
    } catch (err) {
        CLL.error(threadName, 'Fetch Dept', err as string);
        return false;
    }
}
type parseCourseInfoCallback = (course: HKUST_Course) => void;
async function parseCourseInfo(
    elementHTML: string,
    semesterId: string,
    callback: parseCourseInfoCallback
) {
    const $course = load(elementHTML, null, false);
    const course = await generate_HKUST_Course($course, semesterId);
    callback(course);
}
async function appendToDataBase(course: HKUST_Course) {
    const query = {
        name: course.name,
        id: course.id,
        semester: course.semester,
    };
    try {
        courseCollection.updateDoc(query, course, {
            upsert: true,
        });
    } catch (err) {
        throw 'Unable to append to database';
    }
}
async function fetchCourseList(url: string, isUg: boolean): Promise<boolean> {
    const courseInfoPromise: Promise<unknown>[] = [];
    try {
        const { data } = await axios.get(url);
        const $ = load(data, null, false);
        const semesterId = url.split('/')[5];
        $('#classes > div.course').each((i, element) => {
            courseInfoPromise.push(
                parseCourseInfo(
                    $(element).html() as string,
                    semesterId,
                    appendToDataBase
                )
            );
        });
    } catch (err) {
        CLL.error(threadName, 'Fetch Course', err as string);
        return false;
    }
    const pr = await Promise.allSettled(courseInfoPromise);
    new Promise((resolve) => {
        pr.forEach((el, i) => {
            if (el.status === 'rejected')
                CLL.error(threadName, 'Parse Course', el.reason);
        });
    });
    return true;
}
export async function fetchAndUpdateCourseList_HKUST() {
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
    return CLL.log(threadName, 'Fetch Update', 'Course List Update Complete');
}
