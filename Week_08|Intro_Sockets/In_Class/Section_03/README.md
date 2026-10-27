Socekt.io - Drawing App Workshop
--------------------------------

### GOALS:
- Allow mulitiple users to share data with each other in real time
- Understand data flow  
  - Client establishes socket connection with server  
  - Client sends message to server - `.emit()`  
  - Server receives message from client - `.on()`  
  - Server sends the message to **ALL** clients - `.emit()`  
  - **ALL** clients receive the message from server - `.on()`
- Push application to Github, Deploy on Render  

### PART 1 - SETUP
1. Download this entire repository
2. Open a Terminal Window and `cd` into the folder with the code files
3. Run `npm install` to load dependencies listed in `package.json`
4. Review starter code

### PART 2 - MAKE A SOCKET CONNECTION
5. **SERVER** - Initialize the HTTP server
```
//Initialize HTTP server
let http = require("http");
let server = http.createServer(app);
```
6. **SERVER** - Update the `.listen()` line of code to use `server` instead of `app`
```
server.listen()
```
7. **SERVER** - Install socket.io via command line: `npm install socket.io` 
8. **SERVER** - Load and initialize socket.io in `index.js`
```
//Initialize socket.io
let io = require("socket.io");
io = new io.Server(server);
```
9. **SERVER** - Listen for individual clients to connect
```
//Listen for a client to connect and disconnect
io.on("connection", (socket) => {
  console.log("We have a new client: " + socket.id);
  
  //Listen for messages from the client


  //Listen for this client to disconnect
  socket.on("disconnect", () => {
    console.log("A client has disconnected: " + socket.id);
  });
});
```
10. **CLIENT** - Load socket library in `index.html` using a `<script>` tag
```
<script type="text/javascript" src="/socket.io/socket.io.js"></script>
```
11. **CLIENT** - Initialize socket and send resquest to the server to make socket connection
```
//Initialize and connect socket
let socket = io();
```
12. **CLIENT** - Listen for confirmation of socket connection
```
//Listen for confirmation of connection
socket.on('connect', () => {
  console.log("Connected");
});
```

### PART 3 - SEND A MESSAGE TO THE SERVER
13. **CLIENT** - Use p5 to grab the mouse position
```
function setup(){
    createCanvas(windowWidth, windowHeight);
}

function mouseMoved() {
  //Grab mouse position
  let mouseData = { x: mouseX, y: mouseY };

  //Draw yourself? Wait for server?
  fill(0);
  ellipse(mouseX, mouseY, 10, 10);
}
```
14. **CLIENT** - Inside `mouseMoved()` Send mouse the mouse data object to the server. Use `.emit()`
```
//Send mouse data object to the server
socket.emit('message', mouseData);
```
Also, comment out the following lines of code. Let's wait to draw the ellipse locally.
```
//fill(0);
//ellipse(mouseX, mouseY 10, 10);
```
15. **SERVER** - Listen for an event named `message` from client. Use `.on()`.
```
//Listen for an event named 'message' from client
socket.on('message', (data) => {
  console.log("Received 'message' with the following data:");
  console.log(data);

});
```

### PART 4 - SHARE THE MESSAGE WITH CLIENTS
16. **SERVER** - Share the message data with everyone. Use `.emit()`
```
//Send data to ALL clients, including this one
io.emit('message-share', data);

//Send data to ALL other clients EXCEPT the sender
// socket.broadcast.emit('message-share', data);

//Send the data ONLY to the sender
// socket.emit('message-share', data);
```
17. **CLIENT** - Receive the shared message. Use `.on()`.
```
//Listen for an event named 'message-share' from the server
socket.on('message-share', (data) => {
  console.log(data);

});
```
18. **CLIENT** - Draw an ellipse to the canvas
```
drawEllipse(data);
```
```
//Expects an object with x and y properties
function drawEllipse(obj) {
  fill(0);
  ellipse(obj.x, obj.y, 10, 10);
}
```

### PART 5 - CHANGE CLIENT DATA
19. **CLIENT** - Assign a random fill color and ellipse size to the client
```
//In global scope
let myRed, myGreen, myBlue;
let myDiameter;
```
```
//Inside setup
//Generate random fill values
myRed = random(0,255);
myGreen = random(0,255)
myBlue = random(0,255);

//Generate random ellipse size
myDiameter = random(5,50);
```
20. **CLIENT** - Update the mouse data being sent to the server
```
let mouseData = {
  x: mouseX,
  y: mouseY,
  r: myRed,
  g: myGreen,
  b: myBlue,
  d: myDiameter
}
```
21. **CLIENT** - Update the `drawEllipse()` function
```
fill(obj.r, obj.g, obj.b);
noStroke();
ellipse(obj.x, obj.y, obj.d, obj.d);
```