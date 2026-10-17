Data Storage Workshop
---------------------

### Goals:
- Allow users to submit messages
- Save messages in a databse
- Display all messages on the page
- Remember to "follow the data"

### PART 1 - SETUP
1. Open Command Prompt and `cd` into the folder with the code files
2. Run `npm install` to load dependencies listed in `package.json` file
3. Run `node --watch index.js` to serve the app with server restarts
4. Make a change on the server side to confirm `--watch` restart is working

### PART 2 - GET + DISPLAY DATA
5.  **SERVER** - Create a route to serve the data
```
app.get('/messages', (request, response) => {
    //Send data as an object
    response.json(defaultData);
});
```
6. **CLIENT** - Use `fetch()` to make a `GET` request for the data
```
fetch('/messages')
    .then(response => response.json())
    .then(data => {
        console.log(data);

    })
    .catch(error => {
        console.log(error)
    });
```
7. **CLIENT** - Add the data to the page
```
//Select for element on the page
let feed = document.getElementById('feed');
//Loop through data and append to the page
for (let i = 0; i < data.length; i++){
    let currentName = data[i].name;
    let currentMessage = data[i].message;

    let currentEl = document.createElement('p');
    currentEl.innerHTML = currentName + " - " + currentMessage;
    
    feed.appendChild(currentEl);
}
```
### PART 3 - POST + STORE DATA
8. **CLIENT** - Add an event listener to the button
```
//Create an event listener to collect and POST data
let msgButton = document.getElementById('msg-submit');
msgButton.addEventListener('click', () => {
    console.log("Button was clicked!");

});
```
9. **CLIENT** - In the callback function for the button event listener, grab the input value(s) and create an object to store the values.
```
let nameInput = document.getElementById('name-input');
let currentName = nameInput.value;

let msgInput = document.getElementById('msg-input')
let currentMessage = msgInput.value;

let messageObj = {
    name: currentName,
    message: currentMessage
};
console.log(messageObj);
```
10. **CLIENT** - Convert the object into JSON using `JSON.stringify()`
```
let messageObjJSON = JSON.stringify(messageObj);
console.log(messageObjJSON);
```
11. **CLIENT** - Inside the callback function use `fetch()` to make a POST request to the server. 
```
fetch('/newMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: //JSON data goes here
    })
    .then(response => response.json())
    .then(data => {
        console.log("Did this work?");
        console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
```
12. **CLIENT** - Attach the data to the `body` of the `fetch()` request. This will send the data to the server.
```
body: messageObjJSON
```
13. **SERVER** - Create an `app.post()` route to listen for new message data
```
app.post('/newMessage', (request, response) => {
  // console.log(request.body);
});
```
14. **SERVER** - Add json parse middleware so the server can properly read json data
```
app.use(express.json());
```
15. **SERVER** - In the callback function of the `app.post()` route, update the message data with a timestamp
```
let newMessage = request.body;
newMessage.time = Date();
```
16. **SERVER** - Store the new message data in the existing data array
```
defaultData.push(newMessage);
```
17. **SERVER** - Send a response object back to the client with a “success” message
```
response.json({'msg': 'Success'});
```
18. **CLIENT** - Receive a response to the `fetch()` request in `app.js` (see **Step #11**)
19. **CLIENT** - Add the new message data to the page and clear the input box
```
let feed = document.getElementById('feed');
let currentEl = document.createElement('p');
currentEl.innerHTML = currentName + " - " + currentMessage;
feed.appendChild(currentEl);

nameInput.value = ''
msgInput.value = '';
```
### PART 4 - ADD A DATABASE
20. **SERVER** - Install lowdb
```
npm install lowdb
```
21. **SERVER** - Load lowdb using `import` keyword (ESM - ecmascript module)
```
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
```
22. **SERVER** - Add `"type": "module",` to package.json
23. **SERVER** - Update the express import from `require`
```
import express from 'express';
```
24. **SERVER** - Initilaize a lowdb json database AND comment out the existing `defaultData` array
```
const defaultData = { messages: [] };
const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);
```
25. **SERVER** - Write a new message to the database, not the messages array, in the `app.post` route
```
db.data.messages.push(newMessage)
db.write()
    .then(() => {
      //send message back to the client
    });
```
26. **SERVER** - Read the messages from the database, not the messages array, in the `app.get` route
```
db.read()
    .then(() => {
      //save the messages to an object
      let theData = {messages : db.data.messages};
      //send the messages to the client
      response.json(theData);
    });
```
27. **CLIENT**: Check the fetch on window load to make sure the messages are still displaying
```
let theData = data.messages;
```
