let express = require("express");
let app = express();
app.use(express.json());

//setup DB and connect
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://mmg542:quickmongo@cluster0.p0bscd5.mongodb.net/?retryWrites=true&w=majority");
db.on("ready", () => {
    console.log("Connected to the database");
});
db.connect(); 

app.use('/', express.static('public'));

//get all the chirps from the database
app.get('/allchirps', (req, res) => {
    db.get("chirpData").then(chirpData => {
        let chirps = { data : chirpData };
        res.json(chirps);
    })
    
})

//Route to store the data
app.post('/chirpData',  (req, res) => {
    console.log("Received a POST request!");
    let chirpData = req.body;
    console.log(req.body)
    chirpData.timestamp = Date.now();
    console.log(chirpData);
    db.push("chirpData", chirpData);

    //Send a response to the client
    let confirmObj = {
        "task": "success",
        "chirp": chirpData
    };
    res.json(confirmObj)

});


app.listen(3000, () => {
    console.log("listening at localhost:3000");
})