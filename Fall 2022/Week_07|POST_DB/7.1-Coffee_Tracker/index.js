let express = require('express');
let app = express();


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
    coffeeTracker.push(obj);
    console.log(coffeeTracker);
    res.json({task:"success"});
})

app.use('/', express.static('public'));
app.listen(5000, ()=> {
    console.log('listening at localhost:5000');
})

//add route to get all coffee track information
app.get('/getCups', (req,res)=> {
    let obj = {data: coffeeTracker};
    res.json(obj);
})
