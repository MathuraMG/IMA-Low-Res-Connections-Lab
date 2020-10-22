let express = require("express");
let bodyparser = require("body-parser");
let Datastore = require('nedb');
let db = new Datastore('chirp.db');
db.loadDatabase();
let app = express();

app.use(bodyparser.json());
app.use('/', express.static('public'));

app.get('/allchirps', (req,res)=> {
    //???
    db.find({}, function (err, docs) {
        console.log(docs);
        let obj = {
            "chirps" : docs
        }
        res.json(obj);
    });
      
})

app.get('/userchirps/:user', (req,res) => {
    db.find({name: req.params.user}, function (err, docs) {
        console.log(docs);
        let obj = {
            "chirps" : docs
        }
        res.json(obj);
    });
})

app.post('/postchirp', (req,res)=> {
    console.log(req.body);
    db.insert(req.body);
    res.json({"status" : "success"});
})

app.listen(3000, ()=> {
    console.log("listening at localhost:3000");
})



/*

1. Send a chirp
* DONE - CLIENT | Get info from the input boxes
* DONE - CLIENT | fetch ('/postchirps') - send to the server
* DONE - SERVER | server to the DB

2. Seeing the feed
* SERVER | GET request ('/allchirps') - define in the server. THis will go to the DB to get info
* CLIENT | fetch('/allchirps' ) 

3. Seeing one persons feed
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