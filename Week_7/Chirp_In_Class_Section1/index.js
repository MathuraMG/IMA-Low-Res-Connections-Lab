let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let DataStore = require('nedb');
let db = new DataStore('chirp.db');
db.loadDatabase();

app.use(bodyParser.json());
app.use('/', express.static('public'));

app.post('/postchirp', (req, res) => {
    console.log(req.body);
    db.insert(req.body);
    res.json({"data": "success"});
})

app.get('/allchirps', (req, res)=> {
    db.find({},function(err, docs) {
        console.log(docs);
        let obj = {"data": docs};
        res.json(obj);
    })    
})

app.listen(3000, ()=> {
    console.log("listening at localhost:3000");
})







/*

1. Chirp something
    * DONE | CLIENT | get info from input box - store as a json
    * DONE | POST request | /postchirp
    * DONE | SERVER | save to a DB
2. See everyones chirps on the feed
    * SERVER | get the info from the DB
    * GET | /allchirps
3. See a specific persons chirps

*/

















/*
JS on the server side
app.use(express.static()) -- serves the homepage
app.get(‘/data’) -- goes to the DB to get ALL the data
app.get(‘/data/:name’) -- goes to the DB to get ALL the data 
app.post(‘/addchirp’) -- saves the data to NeDB

Js on client site
On window load - fetch(‘/data) -- populates the index.html
When the make the post
Save the post content as an object
Once you have confirmation that the object is saved successfully (Wait for the response from the server), and then prepend it on the “main wall” with all the data
Add a DB

*/