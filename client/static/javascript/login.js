async function submitForm(header) {
    const response = await fetch('/login/auth', {
        method: 'GET',
        headers: header,
        mode: 'same-origin',
        credentials: 'include',
        cache: 'no-cache',
    });
    if (response.redirected) {
        window.location.replace(response.url);
    }
}
function loginSubmit(form) {
    const name = form.elements['name'].value;
    const password = form.elements['password'].value;
    const header = new Headers();
    header.append('name', name);
    header.append('password', password);
    submitForm(header);
    return false;
}
window.addEventListener('load', (event) => {
    const formElement = document.getElementById('loginForm');
    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        loginSubmit(formElement);
    });
});
