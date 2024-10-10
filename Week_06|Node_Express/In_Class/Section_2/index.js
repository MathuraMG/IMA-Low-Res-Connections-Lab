/*
let a = "hello";
let b = " class";
console.log(a + b);
console.log("Writing to the terminal window!");
*/

//Load the express library
let express = require('express');
//Generate the app object
let app = express();

//Define some data
let myData = {
    msg: "Hello class"
};

let foodData = {
    foods: [
        {
            name: "pizza",
            cost: "$20",
            tastiness: 10
        },
        {
            name: "edamame",
            cost: "0.10",
            tastiness: 11
        },
        {
            name: "dragonfruit",
            cost: "0.10",
            tastiness: 5
        }
    ]
};

//Allow for static files to be served from the '/' path
app.use(express.static('public'));

//A route at '/hello' that responds with a string
app.get('/hello', (request, response) => {
    console.log("A Request to '/' was made!");
    console.log(request.path);
    response.send("Hello Class!!!");
});

//A route at '/data' that responds with json
//Also checks for query parameters - this route will check for '?food=[FOOD-NAME]' i.e '/data?food=pizza' and respond accordingly
app.get('/data', (request, response) => {
    console.log("A Request to '/data' was made!");
    console.log(request.path);

    console.log(request.query);
    let queries = request.query;

    //set json response default to be all data
    let responseObj = foodData.foods;
    //check if there is a query value for 'food'
    if (queries.food) {
        //check if the specific 'food' exists in the foodData set
        for (let i = 0; i < foodData.foods.length; i++) {
            if (queries.food == foodData.foods[i].name) {
                responseObj = foodData.foods[i];
            }
        }
    }
    //log out what will be sent back to the client
    console.log(responseObj);
    //send json back to the client - either all foodData or a specific food object
    response.json(responseObj);
});

//A 'dynamic' route with a path parameter
// :food is the name of the path parameter variable
app.get('/data/:food', (request, response) => {
    console.log("A Request to '/data/:food' was made!");
    console.log(request.path);
    console.log(request.params);

    let currentFood = request.params.food;
    console.log(currentFood);

    let currentFoodObj = { msg: "Sorry. No food found." };
    for (let i = 0; i < foodData.foods.length; i++) {
        if (currentFood == foodData.foods[i].name) {
            currentFoodObj = foodData.foods[i];
        }
    }
    response.json(currentFoodObj);
});

//Set up port to listen for requests
app.listen(3000, () => {
    console.log("The app is listening at localhost:3000");
});