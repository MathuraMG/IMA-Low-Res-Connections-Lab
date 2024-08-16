let express = require("express");
let app = express();

app.use('/', express.static('public'));

//Allow express to parse the json
app.use(express.json());

//Create some data
let data = {
    chirps: [
        {
            name: "Craig",
            chirp: "My first chirp"
        },
        {
            name: "Craig",
            chirp: "Me again!"
        },
        {
            name: "CRAIG",
            chirp: "Still me..."
        }
    ]
};

//Create a route to serve data to the client
app.get('/data', (request,response) => {
    console.log("A request was made for data");
    response.json(data);
});

//Create a route to receive data from the client
app.post('/save', (request,response) => {
    console.log("A request was made to save data!");

    //get the data
    console.log(request.body);
    let objToSave = request.body;
    
    //store in local array
    data.chirps.push(objToSave);

    response.json({'msg':'success'});
});

app.listen(3000, ()=> {
    console.log("listening at localhost:3000");
});