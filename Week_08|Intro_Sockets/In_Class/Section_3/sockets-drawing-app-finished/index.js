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

//Listen for client connection
io.on("connection", (socket) =>{
  console.log("We have a connection!");
  console.log(socket.id);

  //Listen for client events
  socket.on('data', (data) =>{
    console.log("Data msg received!");
    console.log(data);
    
    //Send msg to ALL clients
    io.emit('dataAll', data);
  });

  socket.on('pressed', (data) =>{
    console.log("Pressed msg received!");
    console.log(data);
    //Send msg to ALL clients
    io.emit('pressedAll', data);
  });

  //Listen for this client to disconnect
  socket.on("disconnect", () => {
    console.log("A client has disconnected: " + socket.id);
  });


});
