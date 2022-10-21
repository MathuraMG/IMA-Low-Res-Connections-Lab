//Data array
let messages = [
  {
    message: "This is the first chirp message",
    time: "Mon Oct 18 2022 15:36:27 GMT+0300 (Eastern European Summer Time)"
  },
  {
    message: "Hello hello!",
    time: "Mon Oct 18 2022 15:37:05 GMT+0300 (Eastern European Summer Time)"
  }
];

//Server
let express = require('express');
let app = express();

app.use('/', express.static('public'));
app.use(express.json());

//Database
let Datastore = require('nedb');
let db = new Datastore('messages.db');
db.loadDatabase();

//Routes
app.get('/messages', (req, res) => {

  //get data from db
  db.find({}, (err, docs) => {
    if (err) {
      res.json({ task: "task failed" });
    } else {
      //create a data object
      let messageData = {
        data: docs
      }
      res.json(messageData);
    }
  });


  // res.json(messageData);
});

app.post('/new-message', (req, res) => {
  // console.log(req.body);

  let messageData = req.body;
  messageData.time = Date();

  //add to messages array (no longer need it after using nedb)
  // messages.push(messageData);
  // console.log(messages);

  //create an object to send back to the client
  let messageObj = {
    message: messageData
  }

  //add message to db
  db.insert(messageData, (err, newDocs) => {
    if (err) {
      res.json({ task: "task failed" });
    } else {
      res.json(messageObj);
    }
  });

});

//server listens
//we need process.env.PORT for deploying to glitch
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on localhost: ${port}`);
});
