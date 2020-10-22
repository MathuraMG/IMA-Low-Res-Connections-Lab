let express = require("express");
let app = express();

//Package to parse JSON
let bodyParser = require("body-parser");
app.use(bodyParser.json());

//Database initialization
let DataStore = require('nedb');
let db = new DataStore('chirp.db');
db.loadDatabase();

app.use('/', express.static('public'));

//Route to store the data
app.post('/chirpData', (req,res) => {
    console.log("Received a POST request!");
    let chirpData = req.body;
    console.log(chirpData);
    db.insert(chirpData);

    //Send a response to the client
    let confirmObj = {"task" : "success"};
    res.json(confirmObj)

});

//Route to get all of the stored data
app.get('/allchirps', (req,res)=>{
    console.log("Received a GET for all chirps!");

    //Find all the objects in the database
    db.find({},function(err, docs) {
        console.log(docs);
        let allChirps = {"data": docs};
        //Send a response back to the client
        res.json(allChirps);
    })
});

app.listen(3000, ()=> {
    console.log("listening at localhost:3000");
})