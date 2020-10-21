let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());

//DB initial code
let Datastore = require('nedb');
let db = new Datastore('coffee.db');
db.loadDatabase();

let coffeeTracker = [];

// add a route on server, that is listening for a post request
app.post('/noCups', (req, res)=> {
    console.log(req.body);
    let currentDate = Date();
    let obj = {
        date: currentDate,
        coffee: req.body.number
    }
    //insert coffee data into the database
    db.insert(obj,(err, newDocs)=>{
        if(err) {
            res.json({task: "task failed"});
        } else {
            res.json({task:"success"});
        }

    })

})
// serve the static files in public
app.use('/', express.static('public'));


//add route to get all coffee track information
app.get('/getCups', (req,res)=> {

    db.find({}, (err, docs)=> {
        if(err) {
            res.json({task: "task failed"})
        } else {
            let obj = {data: docs};
            res.json(obj);
        }

    })

})

//listen at port 5000
let port = process.env.PORT || 5000;
app.listen(port, ()=> {
    console.log('listening at ', port);
})
