const prices = {
  "mac_intel" : 5,
  "mac_m5" : 10,
  "mac_m3" : 8
}


// 1. get the express module/package into our package
const express = require("express");

//2. initialise the server
const app = express();
const port = 3000;

//3.define the route

// app.get("/", (req,res)=> {
//   res.send("Hello");
// })

//when I got to the home route --> / or localhost:3000/ - serve public folder
app.use("/", express.static("public"));

// sample route to show queries
app.get("/about", (req,res)=> {
  console.log(req.query)

  res.send("This page is about you - "+req.query.name);
})
// sample route to show params
app.get("/prices/:model", (req,res)=> {
  console.log(req.params);
  let modelName = req.params.model;
  res.send(prices[modelName]);
})

//API to get computer information
app.get("/test", (req,res) => {
  console.log(req.rawHeaders);
  console.log(req.rawHeaders[7]);
  res.json({"data" : req.rawHeaders[7]});
})

//using this as an API
app.get("/prices" , (req,res)=> {
  res.json(prices);
})

//4. listen for the server
app.listen(port, ()=> {
  console.log("server listening on  " + port);
})