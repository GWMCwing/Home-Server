async function submitForm(header: Headers) {
    const response = await fetch('/login/auth', {
        method: 'POST',
        headers: header,
        mode: 'same-origin',
        credentials: 'include',
        cache: 'no-cache',
    });
    if (response.redirected) {
        window.location.replace(response.url);
    }
}
function loginSubmit(form: HTMLFormElement) {
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement)
        .value;
    const header = new Headers();
    header.append('name', name);
    header.append('password', password);
    submitForm(header);
    return false;
}
window.addEventListener('load', (event) => {
    const formElement = document.getElementById('loginForm') as HTMLFormElement;
    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        loginSubmit(formElement);
    });
});
