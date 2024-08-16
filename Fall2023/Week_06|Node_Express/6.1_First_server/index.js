//Require express module and create an app object
let express = require('express');
let app = express();

//Define routes
app.get('/', (request, response)=> {
    response.send("Hello");
});

app.get('/about', (request, response) => {
    response.send("this is an about page");
});

//Tell where the server should listen
app.listen(3000, ()=> {
    console.log("app is listening at localhost:3000");
});



