// console.log("The index.js file is working!");

// let a = "hello";
// let b = " class";
// let c = a + b;
// console.log(c);

//load in express
let express = require('express');

//generated our app object
let app = express();

app.use(express.static('public'));

//create a route
app.get('/', (request, response) => {
    console.log("A request was made!");
    response.send("Hello class!");
});

//create a second route
app.get('/second', (request, response) => {
    console.log("A request was made to the second route!");
    response.send("Hello again!!!!!!!");
});

let foodData = {
    foods: [
        {
            name: "donut",
            tastiness: 10
        },
        {
            name: "ice cream",
            tastiness: 9
        },
        {
            name: "pickle",
            tastiness: 1000000
        },
    ]
}

//create a data serving route - check query parameters
app.get('/data', (request, response) => {
    //console.log(request.path);
    console.log("A request was made to /data");

    console.log(request.query);
    let queries = request.query;

    //set response default to be all data
    let responseObj = foodData;
    //check if there a query value for 'food'
    if (queries.food) {
        //check to see if food value exists in the data set
        for (let i = 0; i < foodData.foods.length; i++) {
            if (queries.food == foodData.foods[i].name) {
                responseObj = foodData.foods[i];
            }
        }
    }
    response.json(responseObj);
});

//create a data serving route - with path parameters
app.get('/data/:food', (request, response) => {
    console.log("A request was made to /data/:food");

    console.log(request.params);
    let param = request.params.food;
    console.log(param);

    //Set the default response
    let responseObj = {"msg": "No food found with this name"};
    //check to see if path parameter exists in the data set
    for (let i = 0; i < foodData.foods.length; i++) {
        if (param == foodData.foods[i].name) {
            responseObj = foodData.foods[i];
        }
    }
    response.json(responseObj);
});


//set up port to listen for requests
app.listen(3000, () => {
    console.log("app is listening at localhost:3000");
});

