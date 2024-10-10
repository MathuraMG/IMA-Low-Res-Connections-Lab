console.log("This is my server index.js file!");

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

//5. Require express
let express = require('express');
//6. Create an 'app' object
let app = express();

//11. Serve client-side code
app.use(express.static('public'));

//7. Add the first route
// app.get('/', (request, response) => {
//   // console.log(response);
//   //Send a response back
//   response.send("This is a homepage");
// });

//10. About route
app.get('/about', (request, response) => {
  response.send("This is an About page");
});

//12. Serve our own json data
app.get('/pizzas', (request, response) => {
  //Serve json data
  response.json(pizzas);
});

//13. Serve specific data
app.get('/pizzas/:pizza', (request, response) => {
  console.log(request.params);
  let pizza = request.params.pizza;
  let pizza_obj; //will hold the value that we'll send to the client
  //loop through the data and check if it exists
  for(let i = 0; i<pizzas.data.length; i++){
    // console.log(pizzas.data[i]);
    if(pizza === pizzas.data[i].name){
      pizza_obj = pizzas.data[i]
    }
  }
  console.log(pizza_obj);

  //check for data and send it back, otherwise say there's no such data
  if(pizza_obj){
    response.json(pizza_obj);
  }else{
    response.json({"status": "No such data exists"});
  }
});

//Step 8. Listen to a port
let port = 3000;
app.listen(port, ()=>{
  console.log('The app is listening on localhost: ', port);
});
