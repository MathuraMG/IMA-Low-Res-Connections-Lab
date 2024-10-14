//DB - 0 - install and load lowdb module
import express from 'express'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const app = express();

//DB - 1 - connect to the DB
const defaultData = { coffeeTrackerData: [] };
const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);

//to parse JSON
app.use(express.json());

//add a route on server, that is listening for a post request
app.post('/noCups', (req, res) => {
    console.log(req.body);
    let currentDate = Date().toString(); //using Date().toString() to make it more readable
    let obj = {
        date: currentDate,
        coffee: req.body.number
    }

    //DB - 2 - add value to the DB
    db.data.coffeeTrackerData.push(obj);
    db.write()
        .then(() => {
            res.json({ task: "success" });
        })
})

app.use('/', express.static('public'));
app.listen(5000, () => {
    console.log('listening at localhost:5000');
})

//add route to get all coffee track information
app.get('/getCups', (req, res) => {
    //DB - 3 - fetch from the DB
    db.read()
    .then(() =>{
        let obj = {data: db.data.coffeeTrackerData}
        res.json(obj);
    })
})
