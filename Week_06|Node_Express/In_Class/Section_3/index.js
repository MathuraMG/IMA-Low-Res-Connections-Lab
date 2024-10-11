// console.log("hey this is the server.");
let express = require('express');
let app = express();

let astronauts = {
    "data": [
        {
            "key": "lindgren",
            "name": "Kjell Lindgren",
            "craft": "ISS",
            "wikipedia": "https://en.wikipedia.org/wiki/Kjell_N._Lindgren"
        },
        {
            "key": "hines",
            "name": "Bob Hines",
            "craft": "ISS",
            "wikipedia": "https://en.wikipedia.org/wiki/Robert_Hines_(astronaut)"
        },
        {
            "key": "yang",
            "name": "Liu Yang",
            "craft": "Tiangong",
            "wikipedia": "https://en.wikipedia.org/wiki/Liu_Yang_(taikonaut)"
        }
    ]
}

// serving the entire public folder as static files
// Access URL: http://localhost:3000/
app.use('/', express.static('public'));

// app.get('/', (request, response) => {
//     // console.log(request);
//     response.send("Hello");
// })

// respond with json data, just like an API
// Access URL: http://localhost:3000/data
app.get('/data', (request, response) => {
    response.json(astronauts);
})

// request.params
// E.g. Access URL: http://localhost:3000/astronauts/Liu%20Yang (the space character will be replaced as %20 by the browser)
app.get('/astronauts/:astronaut', (request, response) => {
    let name = request.params.astronaut;
    for (let i=0; i<astronauts.data.length;i++){
        if (astronauts.data[i].name == name) {
            console.log("client is requesting info about:" + name);
            response.json(astronauts.data[i]);
        }
    }
})

// start the server by listening to port 3000
app.listen(3000, () => {
    console.log("app is listening at localhost:3000");
})

//Common ports
//443 HTTPS
//80 HTTP