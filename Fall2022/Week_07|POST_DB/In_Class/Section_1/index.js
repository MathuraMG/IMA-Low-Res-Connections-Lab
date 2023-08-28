let express = require('express'); // include the express module here, and store in the variable "express"
let app = express();

let allMessages = [];

app.use(express.json());

let Datastore = require('nedb'); //including nedb
let db = new Datastore('messages.db'); //creating a db
db.loadDatabase(); //load the db file if it already exists




  app.use("/", express.static("public"));

//POST route for message
app.post("/message", (req,res) => {
  console.log(req.body);
  // allMessages.push(req.body.msg);
  //instead of saving in allMessages, we will store in // DEBUG:
  let msgData = {
    "msg" : req.body.msg
  }
  db.insert(msgData, function (err, newDoc) {   // Callback is optional
   //callbacks fo here
  });

  // console.log(allMessages);
  res.json({status: "ok"});
})

app.get("/messages", (req,res) => {
  db.find({}, function (err, docs) {
    res.json({
      "msgs" : docs
    })
  });

})

//Where can we see the app running
app.listen(8000, () => {
  console.log("app is running at localhost:8000");
})
