//added express
let express = require('express');
//created an object callde app
let app = express();
let bodyParser = require("body-parser")
app.use(bodyParser.json())


let messages = {
  "messages" : [
    "Go Connections Lab!!",
    "javascript is the center of the world wide universe"
  ]
}

//create routes
app.use(express.static('public'))

//create my own api
app.get('/messages', (req,res) => {
    res.json(messages);
})

app.post('/message', (req, res) => {
  console.log(req);
  console.log(req.body);
  messages.messages.push(req.body.msg);
  res.send({task: "success"});
})

//listen at port 3000
app.listen(3000, () => {
    console.log("server is up. app is listening on port 3000");
})
