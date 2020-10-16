//Test js code
let a = "hello";
let b = "goodbye";
let c = a + " " + b;
console.log(c);

//Server with Express
let express = require('express');
let app = express();

//Serve files from the "public" folder
app.use(express.static('public'));

//Main Route
app.get('/', (request, response)=> {
    console.log(request.url);
    response.send("Goodbye");
})

//About Route
app.get('/about', (request, response) => {
    console.log(request.url);
    response.send("this is an about page");
})

//Haoqi's Route
app.get('/about/data', (request, response) => {
    console.log(request.url);
    response.send("Hi Haoqi!!!");
})

//Data Route - Serves JSON
app.get('/data', (request, response) => {
    console.log(request.url);

    let data = {
        "allData": [
            {"data-one": 1},
            {"data-two": 2},  
            {"data-three": 3}
        ]
    };
    response.json(data);
})

//A Catch-All Route
// app.get('*', (request, response)=> {
//     console.log(request.url);
//     response.send("404 Nothing doing here...");
// })

app.listen(3000, ()=> {
    console.log("app is listening at localhost:3000");
})