import 'dotenv/config';
import express from 'express';

const app = express();
app.use('/', express.static('public')); // serve client-side code
app.use(express.json());

// model names change over time, so it lives in .env (see .env.example)
const MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';

// who is the bot? change this to change its personality
const SYSTEM_PROMPT = `You are Pip, a friendly little bot who helps students with creative coding.
Keep answers short (2-4 sentences), be encouraging, and suggest one small thing to try next.`;

// --- the AI call, wrapped in one reusable function ---
async function askGemini({ system, messages }) {
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': process.env.GEMINI_API_KEY
            },
            body: JSON.stringify({
                system_instruction: { parts: [{ text: system }] },
                // Gemini wants each message as { role, parts: [{ text }] }
                contents: messages.map((m) => ({ role: m.role, parts: [{ text: m.text }] }))
            })
        }
    );

    if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
        throw new Error('Gemini returned no text (it may have blocked the reply)');
    }
    return reply;
}

// --- the route: the page sends the whole conversation, we send back the next reply ---
app.post('/chat', async (req, res) => {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'messages must be a non-empty array' });
    }

    // only roles Gemini understands, and only text
    const valid = messages.every(
        (m) => (m.role === 'user' || m.role === 'model') && typeof m.text === 'string'
    );
    if (!valid) {
        return res.status(400).json({ error: 'each message needs a role (user or model) and text' });
    }

    // keep the last 20 messages so the conversation can't grow forever
    const recent = messages.slice(-20);
    while (recent.length && recent[0].role === 'model') {
        recent.shift(); // the conversation has to start with the user
    }

    try {
        const reply = await askGemini({ system: SYSTEM_PROMPT, messages: recent });
        res.json({ reply });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Pip could not answer right now, try again' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening at localhost:${port}`);
});
