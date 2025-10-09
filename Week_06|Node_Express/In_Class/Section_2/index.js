let a = "Is this thing on?";

console.log(a);

console.log("How about this line?");

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

//import express
let express = require("express");
//create an app instance - calling express() returns an object
let app = express();

//middleware - will check the public folder on all requests
app.use(express.static("public"));

//first route
app.get("/", (request, response) => {
  console.log("A request was made to the '/' route!");
  response.send("HELLO CLASS!!!");
});

//second route
app.get("/about", (request, response) => {
  console.log("A request was made to the '/about' route!");
  response.send("THE ABOUT PAGE");
});

//a data serving route
app.get("/data", (request, response) => {
  console.log("A request to the data route");

  //check for any query parameters 
  if (request.query){
    console.log(request.query);
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

app.listen(3000, () => {
  console.log("app is listening at localhost:3000");
});