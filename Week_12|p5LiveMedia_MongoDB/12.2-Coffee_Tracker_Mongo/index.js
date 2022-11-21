let express = require('express');
let app = express();

//DB - 1 - Connect to the mongo DB
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://connlab:connlab@cluster0.piqalge.mongodb.net/?retryWrites=true&w=majority");
db.on("ready", () => {
    console.log("Connected to the database");
});
db.connect(); 

// to parse JSON
app.use(express.json());

let coffeeTracker = [];

// app.get('/', (req,res)=> {
//     res.send('this is the main page');
// })


//2. add a route on server, that is listening for a post request

app.post('/noCups', (req, res)=> {
    console.log(req.body);
    let currentDate = Date();
    let obj = {
        date: currentDate,
        coffee: req.body.number
    }

    //DB - 2 - add values to the DB
    db.push("coffeeTrackerData", obj);

    // coffeeTracker.push(obj);
    // console.log(coffeeTracker);
    res.json({task:"success"});
})

app.use('/', express.static('public'));
app.listen(5500, ()=> {
    console.log('listening at localhost:5500');
})

//add route to get all coffee track information
app.get('/getCups', (req,res)=> {
    //DB - 3 - fetch from the DB
    db.get("coffeeTrackerData").then(coffeeData => {
        let obj = {data: coffeeData};
        res.json(obj);
    })
    
})
