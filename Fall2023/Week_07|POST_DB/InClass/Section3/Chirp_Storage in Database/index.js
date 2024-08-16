let express = require("express");
let app = express();

app.use('/', express.static('public'));

//Allow express to parse the json
app.use(express.json());

/* --------- Database Setup ---------- */
//Require the quickmongo package to use MongoDB
const { Database } = require("quickmongo");

//Create a new database
const db = new Database("YOUR-MONGO-DB-URL-GOES-HERE");
//Connect to the database
db.on("ready", () => {
    console.log("Connected to the database");
});
db.connect();
/*--------------------------------------*/


//Create a route to serve data to the client
app.get('/data', (request, response) => {
    console.log("A request was made for data");

    //get data from database
    db.get('chirpData').then(savedData => {
        console.log(savedData);
        response.json(savedData);
    });
});

//Create a route to receive data from the client
app.post('/save', (request, response) => {
    console.log("A request was made to save data!");

    //get the data
    console.log(request.body);
    let objToSave = request.body;

    //store data in database
    db.push('chirpData', objToSave);
    
    response.json({'msg':'success'});
});

app.listen(3000, () => {
    console.log("listening at localhost:3000");
});