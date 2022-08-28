var timetable;
//
/**
 *
 * @param {String} dept
 * @returns {Course[]} course list of the dept
 */
async function getCourseList(dept) {
    const url = new URL(
        window.location.protocol +
            '//' +
            window.location.hostname +
            '/API/courseList'
    );
    url.searchParams.set('dept', dept);
    url.searchParams.set('semester', '2210');
    url.searchParams.set('school', 'HKUST');
    let data;
    try {
        data = await fetch(url, {
            method: 'GET',
            redirect: 'manual',
        });
    } catch (e) {
        console.error(e);
        return {
            error: true,
        };
    }

    const courseList = await data.json();
    console.log(courseList);
    return courseList;
}
//TODO Factorize
/**
 *
 * @param {String} dept
 */
async function selectDept(dept) {
    const courseList = await getCourseList(dept);
    timetable.setDeptList(dept, courseList.list);
    document.getElementById('main-selector-list').style.display = 'none';
    const courseUl = document.getElementById('course-selector-list');
    courseUl.style.display = 'flex';
    const courseUlLen = courseUl.childElementCount;
    for (let i = 1; i < courseUlLen; i++) {
        courseUl.removeChild(courseUl.children[1]);
    }
    for (let i = 0; i < courseList.list.length; i++) {
        const course = courseList.list[i];
        const tempLi = document.createElement('li');
        tempLi.classList.add('no-select');
        tempLi.classList.add('full-width');
        tempLi.setAttribute('dept', course.dept);
        tempLi.setAttribute('courseId', course.id);
        tempLi.addEventListener('click', (ev) => {
            timetable.selectCourseToDisplay(course.dept, course.id);
        });
        //
        const title = document.createElement('p');
        title.textContent = `${course.dept} ${course.id}`;
        const name = document.createElement('p');
        name.textContent = `${course.name}`;
        //
        tempLi.appendChild(title);
        tempLi.appendChild(name);
        courseUl.appendChild(tempLi);
    }
}
function courseListBack() {
    document.getElementById('course-selector-list').style.display = 'none';
    document.getElementById('main-selector-list').style.display = 'flex';
}
addEventListener('load', (event) => {
    courseListBack();
    timetable = new Timetable();
});
