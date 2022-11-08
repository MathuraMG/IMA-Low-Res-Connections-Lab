//Initialize the express 'app' object
let express = require("express");
let app = express();

app.use("/", express.static("public"));

//Initialize the actual HTTP server
let http = require("http");
let server = http.createServer(app);

//'port' variable allows for deployment
let port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("Server listening at port: " + port);
});

//Socket.io Code
//Iniitialize socket.io
let io = require("socket.io");
io = new io.Server(server);

//Create another Namespace named 'private'
let private = io.of('/private');

//Listen for client connection to the MAIN Namespace
io.on("connection", (socket) => {
  console.log("We have a connection!");
  console.log(socket.id);

  //Listen for client events
  socket.on('data', (data) => {
    //console.log("Data msg received!");
    //console.log(data);

    //Send msg to ALL clients
    io.emit('dataAll', data);
  });

  socket.on('pressed', (data) => {
    //console.log("Pressed msg received!");
    //console.log(data);
    //Send msg to ALL clients
    io.emit('pressedAll', data);
  });

  //Listen for this client to disconnect
  socket.on("disconnect", () => {
    console.log("A client has disconnected: " + socket.id);
  });
});

//Listen for client connection to the PRIVATE Namespce
private.on("connection", (socket) => {
  console.log("We have a PRIVATE connection!");
  console.log(socket.id);

  //Listen for client events to prova
  socket.on('room', (data) => {
    console.log(data.room);
    let roomName = data.room;

    //Code for Steps 8 & 9 go here

    //Add a room property to the individual
    socket.room = roomName;
    //Add socket
    socket.join(roomName);
  });

  socket.on('data', (data) => {
    //console.log("Data msg received!");
    //console.log(data);

    //Send msg to ALL clients
    // private.emit('dataAll', data);

    //Send msg ONLY TO THE ROOM
    let currentRoom = socket.room
    private.to(currentRoom).emit('dataAll', data);
  });

  socket.on('pressed', (data) => {
    console.log("Pressed msg received!");
    //console.log(data);
    //Send msg to ALL clients
    // private.emit('pressedAll', data);

    //Send msg ONLY TO THE ROOM
    let currentRoom = socket.room
    private.to(currentRoom).emit('pressedAll', data);
  });

  //Listen for this client to disconnect
  socket.on("disconnect", () => {
    console.log("A client has disconnected: " + socket.id);
  });
});
