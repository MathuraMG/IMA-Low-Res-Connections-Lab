
//Server with Express
let express = require('express');
let app = express();

//Serve files from the "public" folder
app.use(express.static('public'));

//Pizza Data
let data = {
    "pizzas": [
        {
            "type": "cheese",
            "cost" : 10
        },
        {
            "type": "veggie",
            "cost" : 15
        },  
        {
            "type" : "pepperoni",
            "cost" : 20
        },
        {
            "type": "everything",
            "cost" : 30
        }
    ]
};

//Random Data
app.get('/random', (request, response) => {
    let randomNum = Math.floor(Math.random() * data.pizzas.length);
    let randomPizza = data.pizzas[randomNum];
    console.log(randomPizza);
    response.json(randomPizza);
})

app.listen(3000, ()=> {
    console.log("app is listening at localhost:3000");
})