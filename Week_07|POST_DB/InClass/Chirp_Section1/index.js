//setting up the app
let express = require("express");
let app = express();
app.use(express.json());


//DB URL - mongodb+srv://mmg542:quickmongo@cluster0.p0bscd5.mongodb.net/?retryWrites=true&w=majority
//1. connect to the DB
//setup DB and connect
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://mmg542:quickmongo@cluster0.p0bscd5.mongodb.net/?retryWrites=true&w=majority");
db.on("ready", () => {
    console.log("Connected to the database");
});
db.connect(); 



let chirps = [
    {
        "name" :"ab",
        "msg" : "first message"
    },
    {
        "name" :"cd",
        "msg" : "second message"
    },
    {
        "name" :"ef",
        "msg" : "third message"
    }
]

app.use('/', express.static('public'));

app.get('/allChirps', (req,res) => {
    //3. GET INFO FROM DATABASE
    db.get("inClassChirpData").then(dbData => {
        let chirpData = { data: dbData};
        res.json(chirpData);
    })

    
})

//POST route to add a chirp to the "DB"
app.post('/chirp', (req,res) => {
    console.log(req.body);
    //adding this information to the existing chirps
    //2. ADD INFO TO DB
    db.push("inClassChirpData",req.body);
    console.log(chirps);
    res.json(req.body);
})

app.listen(3000, ()=> {
    console.log("listening at localhost:3000");
})


/*
Create a social media feed

GET -> text

POST -> text, username + pwd

database

*/