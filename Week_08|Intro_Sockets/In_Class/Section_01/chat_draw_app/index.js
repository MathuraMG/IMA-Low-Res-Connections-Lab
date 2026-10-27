import express from "express";
import {Server} from "socket.io";
import {createServer} from "node:http";

//ensuring that our server supports express and sockets
const app = express();
const server = createServer(app); // http server which now supports express
const io = new Server(server); // make the http server support sockets

const PORT = 3000; // useful to add when you deploy

//serves the public folder - SAME
app.use("/", express.static("public"));

//SOCKETS!!
io.on("connect", (socket)=> {
  console.log("new connection ID: ", socket.id);

  //listen for messages from the client
  //2. listen for "mouseData". .on receiving "mouseData"....
  socket.on("mouseData", (data)=> {
    console.log(data);
    //3. .emit() "mouseData" to all the clients
    io.emit("mouseData",data);
  })

  //server side code for chat app
  //2. listen for a new message
  socket.on("newMessage", (data)=> {
    console.log(data);
    //3. share the new message
    io.emit("newMessage",data);
  })
  
  
  //listens for client to disconnect
  socket.on("disconnect", () => {
    console.log("A client has disconnected: " + socket.id);
  });
  

})


server.listen(PORT, ()=> {
  console.log("Running at localhost:", PORT);
})