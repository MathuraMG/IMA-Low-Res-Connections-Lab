//Test js code
let a = "hello";
let b = "class";
let c = a + " " + b;
console.log(c);


//My First Server
let express = require('express');
let app = express();

//Will serve any file in the 'public' folder
app.use(express.static('public'));

//Main Route
app.get('/', (request, response)=> {
    console.log("A request to the main route!!!");
    console.log(request.url);
    response.send("Goodbye");
});

//About Route
app.get('/about', (request, response) => {
    console.log("A request to the about route!!!");
    console.log(request.url);
    response.send("this is an about page");
})

//Data Route
app.get('/data', (request, response)=> {
    console.log("A request to the data route!!!");
    console.log(request.url);

    let allData = {
        "allData": [
            {"data-one": "data-one-stuff"},
            {"data-two": "data-two-stuff"},
            {"data-three": "data-three-stuff"},            
        ]
    };
    response.json(allData);
});

//Server is listening on Port 3000
app.listen(3000, ()=> {
    console.log("app is listening at localhost:3000");
});









