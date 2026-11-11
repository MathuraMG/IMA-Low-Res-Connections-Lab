window.addEventListener('load', () => {
    const status = document.getElementById('status');

    // open route: no password header needed
    document.getElementById('load').addEventListener('click', async () => {
        const response = await fetch('/open/announcements');
        const data = await response.json();

        const list = document.getElementById('list');
        list.innerHTML = '';
        data.data.forEach((item) => {
            const p = document.createElement('p');
            p.textContent = `${item.time} : ${item.message}`;
            list.appendChild(p);
        });
    });

    // admin route: the password travels in a header
    document.getElementById('post').addEventListener('click', async () => {
        const password = document.getElementById('password').value;
        const message = document.getElementById('message').value;

        const response = await fetch('/admin/announce', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-password': password
            },
            body: JSON.stringify({ message })
        });
        const data = await response.json();

        status.textContent = response.ok ? '' : data.error;
        if (response.ok) {
            document.getElementById('message').value = '';
        }
    });
});
