let express = require("express");
let app = express();

let batches = {
  "avacado" : "1st batch",
  "banana" : "2nd batch",
  "coconut" :"3rd",
  "dragon" : "4th"
}

app.use("/",express.static("public"));

app.get("/about", (req, res) => {
  res.send("I like coffee")
})

app.get("/ima" , (req, res) => {
  res.json(batches);
})

// telling the server to run at port 3000
app.listen(3000, () => {
  console.log("app is listening at localhost:3000");
})