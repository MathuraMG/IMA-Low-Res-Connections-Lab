let express = require("express");
let app = express();

app.use('/', express.static('public'));

//Parse JSON data
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//Database initialization
let Datastore = require('nedb');
let db = new Datastore('quotes.db');
db.loadDatabase();

/*-----ROUTES------*/
//A POST route to RECEIVE the data
app.post("/quoteSave", (request, response) => {
    console.log("A POST request!");
    console.log(request.body);

    let objToSave = request.body;
    db.insert(objToSave);

    //Respond to the client
    let message = { "status": "success" };
    response.json(message);
});

//A GET route to SEND ALL of the data
app.get('/data', (request, response) => {
    console.log("A GET request for the data");

    db.find({}, (error, docs) => {
        console.log(docs);
        let allQuotes = { "data": docs };
        //Send a response back to the client
        response.json(allQuotes);
    });
});

/*----- ADDITIONAL ROUTES -----*/

//A GET route to SEND SPECIFIC data - QUERY PARAM (?)
app.get('/name', (request, response) => {

    console.log(request.query);
    //Use Query Parameter: ?user=[USER-NAME]
    let userName = request.query.user;

    //Find data based ONLY on the name property 
    db.find({ "name": userName }, function (err, docs) {
        console.log(docs);
        response.json(docs);
    });
});

//A GET route to SEND SPECIFIC data - ROUTE PARAM (:)
app.get('/name/:searchName', (request, response) => {

    console.log(request.params);
    //Use Query Parameter: ?user=[USER-NAME]
    let userName = request.params.searchName;

    //Find data based ONLY on the name property 
    db.find({ "name": userName }, function (err, docs) {
        console.log(docs);
        response.json(docs);
    });
});

app.listen(3000, () => {
    console.log("listening at localhost:3000");
});