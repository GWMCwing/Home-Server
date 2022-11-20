function selectSchool(schoolName) {
    window.location.href +=
        (window.location.href.endsWith('/') ? '' : '/') + `${schoolName}`;
}
