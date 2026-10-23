//Initialize the express 'app' object
let express = require("express");
let app = express();

//Initialize HTTP server
let http = require("http");
let server = http.createServer(app);

//Initialize socket.io
let io = require("socket.io");
io = new io.Server(server);

app.use("/", express.static("public"));

//Listen for a client to connect and disconnect
io.on("connection", (socket) => {
  console.log("We have a new client: " + socket.id);

  //Listen for messages from the client
  //Listen for an event named 'message' from client
  socket.on('message', (data) => {
    console.log("Received 'message' with the following data:");
    console.log(data);

    //Send data to ALL clients, including this one
    io.emit('message-share', data);

    //Send data to ALL other clients EXCEPT the sender
    // socket.broadcast.emit('message-share', data);

    //Send the data ONLY to the sender
    // socket.emit('message-share', data);
  });


  //Listen for this client to disconnect
  socket.on("disconnect", () => {
    console.log("A client has disconnected: " + socket.id);
  });
});


//'port' variable allows for deployment
let port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("App listening at port: " + port);
});

// server.listen()