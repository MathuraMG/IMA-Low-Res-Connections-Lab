console.log("Index file is running!");

//loading the express library using 'require'
let express = require('express');

//initializing an object using the express library
let app = express();

app.use('/', express.static('public'));

//data
let foodData = {
    foods: [
        {
            name: "cake",
            tastiness: 10
        },
        {
            name: "pizza",
            tastiness: 9
        },
        { 
            name: "zucchini", 
            tastiness: 2
        }
    ]
};


/*------ ROUTES -------*/

//our first route
app.get('/', (request, response) => {
    console.log("Request was made to '/'");
    response.send("Welcome!");
});

//our second route
app.get('/about', (request, response) => {
    console.log("Request was made to '/about'");
    response.send("I made this application in Oct 2022...");
});


//static data serving route
app.get('/data', (request, response) => {
    console.log("A request was made for data!");
    response.json(foodData);
});

//dynamic data serving route
app.get('/data/:item', (request, response) => {
    console.log("A request was made for specfic data!");
    console.log(request.params);

    //grab the specific item from the params object
    let currentItem = request.params.item;

    let foodResponseObj;
    for (let i=0; i < foodData.foods.length; i++ ){
        if (currentItem == foodData.foods[i].name){
            foodResponseObj = foodData.foods[i];
        }
    }

    //if the item is not in the data
    if (!foodResponseObj){
        foodResponseObj = {status: "none found"};
    }
    
    response.json(foodResponseObj);
});

app.listen(3000, () => {
    console.log("The application is running on port 3000. Go to localhost:3000 to see it!");
});