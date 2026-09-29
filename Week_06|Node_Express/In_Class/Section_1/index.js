console.log("Hello world");

//Data to send to the client side
let pizzas = {
  "data": [
    {
      "name": "margherita",
      "ingredients": ["Tomato Sauce", "Mozzarella", "Basil"],
      "price": 12.99,
      "vegetarian": true
    },
    {
      "name": "pepperoni",
      "ingredients": ["Tomato Sauce", "Mozzarella", "Pepperoni"],
      "price": 14.99,
      "vegetarian": false
    },
    {
      "name": "bbq",
      "ingredients": ["BBQ Sauce", "Mozzarella", "Chicken", "Red Onions", "Cilantro"],
      "price": 15.99,
      "vegetarian": false
    }
  ]
}

//3. Require express
let express = require('express');
// console.log(express);

//4. Call express function
let app = express();
// console.log(app);

//11. Serve static files
app.use(express.static('public'));

//5. First route
// app.get('/', function(request, response){
//   response.send("This is the homepage");
// });

//8. about route
app.get('/about', function(request, response){
  response.send("This is an about page");
});

//9. Create a data route
app.get('/pizza', function(request, response){
  response.json(pizzas);
});

//10. Serve specific data
app.get('/pizza/:pizza', function(request, response){
  console.log(request.params.pizza);

  let pizza = request.params.pizza;

  let pizza_obj; // will hold the value that we'll send to the client

  //loop through the data and check if it exists
  for(let i = 0; i<pizzas.data.length; i++){
    // console.log(pizzas.data[i]);
    if(pizza == pizzas.data[i].name){
      pizza_obj = pizzas.data[i];
    }
  }
  console.log(pizza_obj);
  //check for data and send it back, otherwise say there is no such data
  if(pizza_obj){
    response.json(pizza_obj);
  } else{
    response.json({"status": "No such data exists"});
  }
});

//6. Listen to run the server
app.listen(5500, function(){
  console.log("The app is listening on localhost:5500");
});
