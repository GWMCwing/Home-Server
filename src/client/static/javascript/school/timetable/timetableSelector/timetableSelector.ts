import { SchoolName } from '../../../../../../res/type/common';

export function selectSchool(schoolName: SchoolName) {
    window.location.href +=
        (window.location.href.endsWith('/') ? '' : '/') + `${schoolName}`;
}
