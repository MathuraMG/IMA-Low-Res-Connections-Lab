// console.log("Hello???");
// let a = 10;
// console.log(a);

//import express
let express = require("express");

//create an app instance - calling express() returns an object
let app = express();

//middleware to server static files
app.use(express.static("public"));

//GET route for main page
app.get("/", (request, response) => {
    //console.log(request.rawHeaders);
    console.log(request.path);
    response.send("Hello Class!");
});

//GET route for about page
app.get("/about", (request, response) => {
    console.log(request.path);
    response.send("This is the About Page");
});

//GET route to serve json data
app.get("/data", (request, response) => {
    console.log("A request to the data route");
    console.log(request.path);

    //log out query params
    if (request.query) {
        console.log(request.query);
        //send response
    }
    response.json(foodData);
});

//a data serving "dynamic" route with a path parameter
app.get("/data/:food", (request, response) => {
    console.log("A request to the dynamic data route!");

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

//specify a listening port
app.listen(3000, () => {
    console.log("app is listening at localhost:3000");
});

//data - javascript object
let foodData = {
    foods: [
        {
            name: "pizza",
            cost: "$4",
            tastiness: 9
        },
        {
            name: "taco",
            cost: "$3",
            tastiness: 8
        },
    ],
};