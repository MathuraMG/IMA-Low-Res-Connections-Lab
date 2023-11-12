const PORT = 5000;
//creating the express app
let express= require("express");
let app = express();
app.use("/", express.static("public"));


let sqObjects = [];
let noSqObjects = 10;
initialiseSqObjects();

//creating the http server - this is a new step!
let http = require("http");
let server = http.createServer(app);

//initialise socket.io
let io = require("socket.io");
io = new io.Server(server);

// Listen for a new connection
io.sockets.on("connect", (socket) => {
  console.log("New connection : ", socket.id);

  socket.on("start", () => {
    initialiseSqObjects();
    let data = {
      "sqObjects": sqObjects
    }
    io.sockets.emit("setSqObjects", data);
  })

  socket.on("mouseData", (data)=> {
    //send to all clients
    io.sockets.emit("mouseDataServer", data); 
  })

  //send the sqObjects Info that you have rx from a client to all clients
  socket.on("sqObjectsFromClient",(data) => {
    io.sockets.emit("sqObjectsFromServer", data);
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

function initialiseSqObjects() {
  sqObjects  = [];// clear the array before adding the new sqObjects;
  for(let i =0;i<noSqObjects;i++) {
    let xPos = Math.floor(Math.random()*400); //get a random value bw 0-400 (assuming width of canvas is 400)
    let yPos = Math.floor(Math.random()*400);
    sqObjects.push({id:i,x:xPos, y:yPos, touched:false}); //set touched to false initially, once a mouse has touched, we will change this. 
  }
}