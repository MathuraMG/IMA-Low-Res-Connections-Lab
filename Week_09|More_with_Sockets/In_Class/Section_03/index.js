//Initialize the express 'app' object
let express = require("express");
let app = express();

app.use("/", express.static("public"));

//Initialize HTTP server
let http = require("http");
let server = http.createServer(app);

//'port' variable allows for deployment
let port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("App listening at port: " + port);
});

//Initialize socket.io
let io = require("socket.io");
io = new io.Server(server);

//Listen for a client to connect and disconnect
io.on("connection", (socket) => {
  console.log("We have a new client: " + socket.id);

  //Listen for an event named 'message' from client
  socket.on('message', (data) => {

    //Send data to ALL clients, including this one
    io.emit('message-share', data);
  });

  //Listen for this client to disconnect
  socket.on("disconnect", () => {
    console.log("A client has disconnected: " + socket.id);
  });
});

//Create another namespace named 'private'
let private = io.of('/private');

//Listen for a client to connect and disconnect
private.on("connection", (socket) => {
  console.log("We have a new client: " + socket.id);

  //Listen for an event named 'message' from client
  socket.on('message', (data) => {

    //Send data to ALL clients, including this one
    // private.emit('message-share', data);

    let currentRoom = socket.room
    private.to(currentRoom).emit('message-share', data);
  });

  socket.on('room', (data) => {
    console.log(data.room);
    let roomName = data.room;

    //Code for Steps 12 & 13 go here
    //Add a room property to the individual
    socket.room = roomName;
    //Add socket to room
    socket.join(roomName);

  });


  //Listen for this client to disconnect
  socket.on("disconnect", () => {
    console.log("A client has disconnected: " + socket.id);
  });
});