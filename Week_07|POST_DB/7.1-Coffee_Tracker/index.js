let express = require('express');
let app = express();

app.use('/', express.static('public')); //serve client-side
app.use(express.json()); // to parse JSON

let coffeeTracker = [];

//2. add a route on server, that is listening for a post request
app.post('/noCups', (req, res)=> {
    console.log(req.body);
    let currentDate = Date();
    let obj = {
        date: currentDate,
        coffee: req.body.number
    }
    coffeeTracker.push(obj);
    console.log(coffeeTracker);
    res.json({task:"success"});
});

//add route to get all coffee track information
app.get('/getCups', (req,res)=> {
    let obj = {data: coffeeTracker};
    res.json(obj);
});

//Listen on a port
app.listen(3000, ()=> {
    console.log('listening at localhost:3000');
});
