//Initialize the express 'app' object
let express = require("express");
let app = express();

app.use("/", express.static("public"));

//Initialize the actual HTTP server
let http = require("http");
let server = http.createServer(app);

//'port' variable allowd for deployment
let port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("Server listening at port: " + port);
});

//Socket.io Code
//Initialize socket.io
let io = require("socket.io");
io = new io.Server(server);

//Create another namespace named 'private'
let private = io.of('/private');

//Listen for socket connections to main namespace
io.on("connection", (socket) => {

  console.log("We have a new client connected!")
  console.log(socket.id);

  //Listening for mnouse move
  socket.on('data', (data) => {
    io.emit('dataAll', data);
  });

  //Listening for mouse click
  socket.on('dataPress', (data) => {
    io.emit('dataPressAll', data);
  });

  //Listen for this client to disconnect
  socket.on("disconnect", () => {
    console.log("A client has disconnected: " + socket.id);
  });
});

//Listen for socket connections to "private" namespace
private.on("connection", (socket) => {

  console.log("We have a new PRIVATE client connected!")
  console.log(socket.id);

  socket.on('room', (data) => {
    console.log(data.room);
    let roomName = data.room;

    //Add a room property to the individual socket
    socket.room = roomName;

    //Add socket to the room
    socket.join(roomName);
  });

  //Listening for mnouse move
  socket.on('data', (data) => {
    //Emit message to this socket's room
    private.to(socket.room).emit('dataAll', data);
  });

  //Listening for mouse click
  socket.on('dataPress', (data) => {
    //Emit message to this socket's room
    private.to(socket.room).emit('dataPressAll', data);
  });

  //Listen for this client to disconnect
  socket.on("disconnect", () => {
    console.log("A client has disconnected: " + socket.id);
  });
});