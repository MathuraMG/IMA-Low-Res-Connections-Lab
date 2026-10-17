//Data array
// let defaultData = [
//   {
//     name: "Me",
//     message: "This is my first message"
//   },
//   {
//     name: "You",
//     message: "Hello hello!"
//   }
// ];

//Set up the server
// let express = require('express');
import express from 'express';
let app = express();

import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const defaultData = { messages: [] };
const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);


//Serve static files from a public folder
app.use(express.static('public'));
app.use(express.json());

app.get('/messages', (request, response) => {
  //Send data as an object
  // response.json(defaultData);

  db.read()
    .then(() => {
      //save the messages to an object
      let theData = {messages : db.data.messages};
      //send the messages to the client
      response.json(theData);
    });

});

app.post('/newMessage', (request, response) => {
  console.log(request.body);
  let newMessage = request.body;
  newMessage.time = Date();

  // defaultData.push(newMessage);
  db.data.messages.push(newMessage)
  db.write()
    .then(() => {
      //send message back to the client
    });

});

//Set port variable to listen for requests
let port = 3000;
app.listen(port, () => {
  console.log('Server listening on localhost:', port);
});

/*ROUTES */

