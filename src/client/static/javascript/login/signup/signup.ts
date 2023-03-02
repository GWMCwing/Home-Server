async function post(dom: HTMLFormElement) {
    const fd = new FormData(dom);
    const userName = fd.get('username');
    const password = fd.get('password');
    const secret = fd.get('secret');
    const res = await fetch('/signup/passport', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            username: userName,
            password: password,
            secret: secret,
        }),
    });
    //TODO
}
