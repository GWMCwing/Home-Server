import { SchoolName } from '../../../../../../res/type/common';

function selectSchool(schoolName: SchoolName) {
    window.location.href +=
        (window.location.href.endsWith('/') ? '' : '/') + `${schoolName}`;
}

window.addEventListener('load', () => {
    const schoolList = document.getElementById(
        'schoolList'
    ) as HTMLUListElement;
    schoolList.childNodes.forEach((school) => {
        school.addEventListener('click', () => {
            selectSchool(school.textContent as SchoolName);
        });
    });
});
