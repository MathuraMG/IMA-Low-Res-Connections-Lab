window.addEventListener('load', () => {
    const output = document.getElementById('output');

    // helper: send JSON to the server and show whatever it says
    async function send(url, method, body) {
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: body ? JSON.stringify(body) : undefined
        });
        const data = await response.json();
        output.textContent = data.message || data.error;
    }

    function getCredentials() {
        return {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };
    }

    document.getElementById('register').addEventListener('click', () => {
        send('/register', 'POST', getCredentials());
    });

    document.getElementById('login').addEventListener('click', () => {
        send('/login', 'POST', getCredentials());
    });

    // the browser sends the session cookie automatically, no extra code needed
    document.getElementById('get-secret').addEventListener('click', () => {
        send('/secret', 'GET');
    });

    document.getElementById('logout').addEventListener('click', () => {
        send('/logout', 'POST');
    });
});
