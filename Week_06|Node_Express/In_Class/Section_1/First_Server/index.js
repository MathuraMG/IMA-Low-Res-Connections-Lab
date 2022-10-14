let express = require('express'); // include the express module here, and store in the variable "express"
let app = express();

let CL = {
  "section1" : {
    "students" : 8,
    "time" : "7:30am EST"
  }, 
  "section2" : {
    "students" : 11,
    "time" : "10:30am EST"
  }, 
  "section3" : {
    "students" : 11,
    "time" : "7:00pm EST"
  }, 
};

//What happens when we GET from the route -> /
// app.get("/", (req,res) => {
//   res.send("Hello!");
// })

app.use("/", express.static("public"));

app.get("/about", (req,res) => {
  res.send("My name is Mathura");
})

app.get("/classes", (req, res) => {
  res.json(CL);
})

//Where can we see the app running
app.listen(3000, () => {
  console.log("app is running at localhost:3000");
})



/*

Run `npm init` from the project folder
look at package.json
create an index.js file - add some content `console.log("hello")`
run `node index.js` from the project folder in the terminal/cmd
npm install express
*/