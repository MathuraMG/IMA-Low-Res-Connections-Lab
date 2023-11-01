const PORT = 7000;
//creating the express app
let express= require("express");
let app = express();
app.use("/", express.static("public"));

let totalClientsinPublic = 0;


//creating the http server - this is a new step!
let http = require("http");
let server = http.createServer(app);

//initialise socket.io
let io = require("socket.io");
io = new io.Server(server);

let publicSockets = io.of("/public");
/** PRIVAT NAMESPACE - this channel will allow room creation */
let privateSockets = io.of("/private");

/* public rx and sending to public and to private */
// Listen for a new connection
publicSockets.on("connect", (socket) => {
  console.log("New connection : ", socket.id);
  totalClientsinPublic+=1;
  if(totalClientsinPublic>3) {
    console.log("warning");
    publicSockets.emit("warning",{});
  }
  console.log("total clients in public namespace ", totalClientsinPublic);
  socket.on("mouseData", (data)=> {
 
    //send to all clients
    publicSockets.emit("mouseDataServer", data); 
    privateSockets.emit("mouseDataServer", data);
  })

  // in case of disconnection
  socket.on("disconnect", () => {
    console.log("Disconnection : ", socket.id);
    totalClientsinPublic-=1;
    console.log("total clients in public namespace ", totalClientsinPublic);
  })

})



/* private rx and sending only to private */
// Listen for a new connection
privateSockets.on("connect", (socket) => {
  console.log("New connection : ", socket.id);

  socket.on("addToRoom", (data) => {
    let roomNo = data.roomNo;
    socket.roomNo = roomNo;
    //socket has joined the room "data.roomNo" and that info is stored in the socket object
    socket.join(roomNo);
  })

  socket.on("mouseData", (data)=> {
    //send to all clients
    privateSockets.to(socket.roomNo).emit("mouseDataServer", data); 
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

