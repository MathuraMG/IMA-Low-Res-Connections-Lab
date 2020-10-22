let express = require("express");
let app = express();
let bodyParser = require('body-parser');

//Database initialization
let DataStore = require('nedb');
let db = new DataStore('chirp.db');
db.loadDatabase();

//Express Middleware
app.use('/', express.static('public'));
app.use(bodyParser.json());

app.post('/chirpData', (req,res) => {
    console.log("Received a POST request!");

    let chirpObj = req.body;
    console.log(chirpObj);
    db.insert(chirpObj);

    //Send msg back to the client
    let responseObj = {"msg": "success"};
    res.json(responseObj);
});

app.listen(3000, ()=> {
    console.log("listening at localhost:3000");
})