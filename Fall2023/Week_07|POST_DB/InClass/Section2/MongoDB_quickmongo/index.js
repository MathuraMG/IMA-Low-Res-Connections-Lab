//Data array
let messages = [
  {
    message: "This is the first y message",
    time: "Mon Oct 18 2022 15:36:27 GMT+0300 (Eastern European Summer Time)"
  },
  {
    message: "Hello hello!",
    time: "Mon Oct 18 2022 15:37:05 GMT+0300 (Eastern European Summer Time)"
  }
];

//STEP 1. Set up a server
let express = require('express');
let app = express();

//Serve a public folder
app.use(express.static('public'));
app.use(express.json());

//Listen
let port = 3000;
app.listen(port, () => {
  console.log('Server listening on localhost:', port);
});

/*DATABASE */
const { Database } = require("quickmongo");
const db = new Database("your url")
db.on('ready', () => {
  console.log("Connected to the database");
});
db.connect();

/*ROUTES */
//STEP 3-4. GET all the messages as an object
app.get('/messages', (request, response) => {
  // let messagesData = {
  //   data: messages
  // }
  // response.json(messagesData);

  //STEP 19. Get messages from the database
  db.get('messages')
    .then(data => {
      console.log(data);
      let messages = data;
      let messagesData = {
        data: messages
      }
      response.json(messagesData);
    });
});

//STEP 9. POST for a new message
app.post('/new-message', (request, response) => {
  console.log(request.body);
  //STEP 11. add message to the array
  let msgData = request.body;
  msgData.time = Date();
  //push to the messages array
  // messages.push(msgData);
  // console.log(messages);

  //STEP 18. Insert new message to the database
  db.push('messages', msgData);

  //STEP 12. Send the message back to the client
  let messageObj = {
    task: "success",
    message: msgData
  }
  response.json(msgData);
});
