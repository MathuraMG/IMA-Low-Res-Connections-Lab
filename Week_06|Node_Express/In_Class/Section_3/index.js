// import express
let express = require("express");

// create an app instance - calling express() returns an object
let app = express();

let restaurants = {
  ichiran: [
    {
      name: "Tonkotsu Ramen",
      price: 18,
      spicy: 2,
      vegetarian: false
    },
    {
      name: "Spicy Ramen",
      price: 19,
      spicy: 4,
      vegetarian: false
    },
    {
      name: "Veggie Ramen",
      price: 17,
      spicy: 1,
      vegetarian: true
    }
  ],

  ippudo: [
    {
      name: "Akamaru Modern",
      price: 20,
      spicy: 2,
      vegetarian: false
    },
    {
      name: "Karaka Spicy",
      price: 21,
      spicy: 5,
      vegetarian: false
    },
    {
      name: "Plant-Based Ramen",
      price: 19,
      spicy: 1,
      vegetarian: true
    }
  ]
};


// app.get("/", (request, response) => {
//   response.send("Welcome to our restaurant server!");
// });


// Serve static files from the `public` folder. Static files do not need a route
// handler: for example, a request for `/` serves `public/index.html`, and a
// request for `/style.css` serves `public/style.css` (if that file exists).
// The first argument, `/`, is the URL prefix where these files are available.
app.use("/", express.static("public"));

// This route handles requests to `/about`.
app.get("/about", (request, response) => {
  response.send("This server has restaurant information!");
});

// This route handles requests to `/restaurants` and returns all restaurant
// data as JSON. For example, visit http://localhost:3000/restaurants.
app.get("/restaurants", (request, response) => {
//   response.send("This server has restaurant information!");
     response.json(restaurants);
});

// The `:restaurant` part is a path parameter: it captures a value from the
// URL path. For example, `/restaurants/ichiran` makes `request.params.restaurant`
// equal to `"ichiran"`; `/restaurants/ippudo` makes it `"ippudo"`.
app.get("/restaurants/:restaurant", (request, response) => {
  let restaurantName = request.params.restaurant;
  let menu = restaurants[restaurantName];

  if (!menu) {
    response.status(404).json({
      error: "Restaurant not found"
    });
    return;
  }

  // Query parameters come after `?` and can be used to filter or customize a
  // request. Here, `?vegetarian=true` makes `request.query.vegetarian` equal
  // `"true"`, so this route returns only vegetarian dishes. For example:
  // `/restaurants/ichiran?vegetarian=true`. Query values are strings.
  if (request.query.vegetarian === "true") {
    menu = menu.filter((item) => {
      return item.vegetarian === true;
    });
  }

  response.json(menu);
});

app.listen(3000, () => {
  console.log("app is listening at localhost:3000");
});