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


// or serving a simple string
// app.get('/', (request, response) => {
//     // console.log(request);
//     response.send("<h1>This is a simple web page.</h1>");
// })

// respond with json data, just like an API
// Access URL: http://localhost:3000/data
app.get('/data', (request, response) => {
    response.json(astronauts);
})


//======================================================================
//  PATH PARAMETERS: For identifying a specific, required resource
//======================================================================
//
//  WHAT IT IS: A path parameter is a variable part of the URL path.
//  Think of it like a specific address: you need the street name AND the house number.
//  The house number here is the path parameter.
//
//  WHEN TO USE: Use it when the parameter is REQUIRED to identify a
//  specific item. The URL doesn't make sense without it.
//  - Good: /users/123, /products/apple-watch, /astronauts/Liu%20Yang
//  - Bad:  /users, /products (These should return a LIST, not a specific item)
//
//  HOW TO USE:
//  1. Define the parameter in your route path with a colon (e.g., '/:astronaut').
//  2. Access its value from the `request.params` object (e.g., `request.params.astronaut`).
//
//  Access URL: http://localhost:3000/astronauts/Liu%20Yang
//
app.get('/astronauts/:astronaut', (request, response) => {
    let name = request.params.astronaut;
    for (let i=0; i<astronauts.data.length;i++){
        if (astronauts.data[i].name == name) {
            console.log("client is requesting info about:" + name);
            response.json(astronauts.data[i]);
        }
    }
})



//======================================================================
//  QUERY PARAMETERS: For filtering, sorting, or configuring a resource list
//======================================================================
//
//  WHAT IT IS: Query parameters are key-value pairs that come after a '?'
//  in the URL. Think of them as optional filters on a shopping website.
//  You can view all products, OR you can filter by 'brand=Apple' and 'color=black'.
//
//  WHEN TO USE: Use them for anything OPTIONAL. The URL should still work
//  perfectly fine without the query parameters, usually returning a complete list.
//  - Good: /astronauts?craft=ISS (Filters for astronauts on the ISS)
//  - Good: /products?sort=price_ascending&category=electronics
//
//  HOW TO USE:
//  1. They are NOT defined in the Express route path string.
//  2. Access their values from the `request.query` object (e.g., `request.query.craft`).
//
//  You can comment out the app.get('/data', ..) route above, and uncomment the code block below to test.
//  Access URL: http://localhost:3000/data?craft=ISS

// app.get('/data', (request, response) => {
//     // Get the 'craft' query parameter
//     let craft = request.query.craft;

//     // Filter astronauts based on the craft parameter if provided
//     if (craft) {
//         let filteredAstronauts = astronauts.data.filter(astronaut => astronaut.craft === craft);
//         response.json(filteredAstronauts);
//     } else {
//         // If no query parameter is provided, return all astronauts
//         response.json(astronauts);
//     }
// });


// start the server by listening to port 3000
app.listen(3000, () => {
    console.log("app is listening at localhost:3000");
})

//Common ports
//443 HTTPS
//80 HTTP