window.addEventListener('load', () => {
    // the whole conversation lives here, in the browser
    // each item looks like { role: 'user' or 'model', text: '...' }
    const messages = [];

    const chat = document.getElementById('chat');
    const input = document.getElementById('message');
    const button = document.getElementById('send');

    // add a chat bubble to the page and return it
    function addBubble(text, who) {
        const bubble = document.createElement('p');
        bubble.classList.add('bubble', who);
        bubble.textContent = text;
        chat.appendChild(bubble);
        chat.scrollTop = chat.scrollHeight;
        return bubble;
    }

    async function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        input.value = '';
        addBubble(text, 'user');
        messages.push({ role: 'user', text });

        button.disabled = true;
        const thinking = addBubble('...', 'model');

        try {
            // send the WHOLE conversation so the bot remembers what was said
            const response = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages })
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            thinking.textContent = data.reply;
            messages.push({ role: 'model', text: data.reply });
        } catch (error) {
            console.error(error);
            thinking.textContent = 'Oops: ' + error.message;
            messages.pop(); // that message got no reply, so take it out of the history
        } finally {
            button.disabled = false;
            input.focus();
        }
    }

    button.addEventListener('click', sendMessage);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});
