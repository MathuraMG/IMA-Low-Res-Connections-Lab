import 'dotenv/config';
import express from 'express';

const app = express();
app.use('/', express.static('public')); // serve client-side code
app.use(express.json());                // parse JSON bodies

const announcements = [];

// MIDDLEWARE - our own gatekeeper: only lets the request through if the password matches
function checkPassword(req, res, next) {
    const password = req.headers['x-password'];

    if (password === process.env.ADMIN_PASSWORD) {
        next();                                            // allowed, go on to the route
    } else {
        res.status(401).json({ error: 'wrong password' }); // stop here, never reaches the route
    }
}

//-------*************-----------
//DUMMY MIDDLEWARE
function dummyMiddleware(req,res,next) {
    console.log("all routes go through this");
    console.log("PATH : ", req.originalUrl);
    next(); // go to the next thing
}
app.use('/', dummyMiddleware);
//-------*************-----------

// OPEN route: no password needed
app.get('/open/announcements', (req, res) => {
    res.json({ data: announcements });
});

// every path that starts with /admin must pass checkPassword first
// (this line has to come BEFORE the /admin routes below)
// this is the how we call the MIDDLEWARE! yay
app.use('/admin', checkPassword);

// ADMIN route - anything with /admin will have to pass the previous MIDDLEWARE


app.post('/admin/announce', (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'message is required' });
    }
    announcements.push({ message, time: Date().toString() });
    res.json({ task: 'success' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening at localhost:${port}`);
});
