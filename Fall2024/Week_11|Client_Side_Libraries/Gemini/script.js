let conversationHistory = [{
    role: 'model',
    parts: [{
        text: "Hello! I'm a simple chatbot powered by Gemini. Enter your API key above to begin."
    }]
}];

async function sendMessage() {
    const apiKey = document.getElementById('apiKey').value.trim();
    if (!apiKey) {
        appendMessage('Please enter your API key first.', 'bot');
        return;
    }

    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    
    if (!message) return;

    appendMessage(message, 'user');
    conversationHistory.push({
        role: 'user',
        parts: [{ text: message }]
    });
    
    userInput.value = '';

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: 'user',
                        parts: [{
                            text: `You are a helpful and friendly educational assistant. 
                                  Please maintain consistent context throughout our conversation.
                                  Here is our conversation history followed by the latest message:
                                  
                                  ${conversationHistory.map(msg => 
                                      `${msg.role}: ${msg.parts[0].text}`
                                  ).join('\n')}`
                        }]
                    }
                ]
            })
        });

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message || 'API Error');
        }

        const botResponse = data.candidates[0].content.parts[0].text.trim();
        
        appendMessage(botResponse, 'bot');
        conversationHistory.push({
            role: 'model',
            parts: [{ text: botResponse }]
        });

        if (conversationHistory.length > 10) {
            conversationHistory = conversationHistory.slice(-10);
        }

    } catch (error) {
        console.error('Error:', error);
        appendMessage(`Error: ${error.message}. Please check your API key and try again.`, 'bot');
    }
}

function appendMessage(message, sender) {
    const chatArea = document.getElementById('chatArea');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = message;
    chatArea.appendChild(messageDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
}

document.getElementById('userInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});
