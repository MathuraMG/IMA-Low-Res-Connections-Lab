const PORT = 5000;
//creating the express app
let express= require("express");
let app = express();
app.use("/", express.static("public"));

//creating the http server - this is a new step!
let http = require("http");
let server = http.createServer(app);

//initialise socket.io
let io = require("socket.io");
io = new io.Server(server);

// Listen for a new connection
io.sockets.on("connect", (socket) => {
  console.log("New connection : ", socket.id);

  socket.on("mouseData", (data)=> {
    console.log(data);
    //send to all clients
    io.sockets.emit("mouseDataServer", data); 
  })

  

  // in case of disconnection
  socket.on("disconnect", () => {
    console.log("Disconnection : ", socket.id);
  })

})

//run the app on port 5000
server.listen(PORT, () => {
  console.log("server on port ",PORT);
})


/*

✅1. setting up sockets 
  - ✅setting up an http server
  - ✅setting up socket.io

✅2. Ensure that the client can connect to the server via sockets
  - ✅server recognising the connect
  - ✅client attempting to connect

✅3. Client draws and sends to server

4. Server receives and sends to ALL the clients

5. Clients rx and draw on their screens


*/