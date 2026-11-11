import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import bcrypt from 'bcryptjs';

if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET is missing, add it to your .env file');
}

const app = express();
app.use('/', express.static('public')); // serve client-side code
app.use(express.json());

// SESSIONS - after login, the browser keeps a cookie that points to this server-side session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 } // 1 hour
}));

// our "database": an array of { username, passwordHash }
// (it resets when the server restarts, swap in lowDB or Supabase to keep it)
const users = [];

// MIDDLEWARE - lets a request through only if someone is logged in
function requireLogin(req, res, next) {
    if (req.session.username) {
        next();
    } else {
        res.status(401).json({ error: 'please log in first' });
    }
}

// REGISTER
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (typeof username !== 'string' || typeof password !== 'string' || !username.trim() || !password) {
        return res.status(400).json({ error: 'username and password are required' });
    }
    if (users.find((u) => u.username === username)) {
        return res.status(409).json({ error: 'that username is taken' });
    }

    // never store the password itself, only a salted hash of it
    const passwordHash = await bcrypt.hash(password, 10);
    users.push({ username, passwordHash });

    res.json({ message: `registered ${username}` });
});

// LOGIN
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username);
    const passwordMatches = user && await bcrypt.compare(String(password), user.passwordHash);

    if (!passwordMatches) {
        // same message for "no such user" and "wrong password" so we don't leak which usernames exist
        return res.status(401).json({ error: 'wrong username or password' });
    }

    req.session.username = user.username; // this is what "being logged in" means
    res.json({ message: `welcome back ${user.username}` });
});

// PROTECTED ROUTES - requireLogin runs first
app.get('/me', requireLogin, (req, res) => {
    res.json({ username: req.session.username });
});

app.get('/secret', requireLogin, (req, res) => {
    res.json({ message: `the secret is 42, shhh ${req.session.username}` });
});

// LOGOUT
app.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ message: 'logged out' });
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening at localhost:${port}`);
});
