import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);   // HTTP server, Express handles its requests
const io = new Server(server);      // Socket.io attached to the same server

app.use(express.static("public"));

//OPEN NAMESPACE
const openNamespace = io.of('/open');

openNamespace.on("connect", (socket)=> {
  console.log("socket connected to OPEN : ", socket.id);
  console.log("total people in OPEN : ", openNamespace.sockets.size  );
  socket.on("disconnect", ()=> {
    console.log("socket disconnected from OPEN : ", socket.id);

    console.log("total people in OPEN : ", openNamespace.sockets.size  );
  })

  socket.on("msg", (data)=> {
    openNamespace.emit("msg",data);
    closedNamespace.emit("msg",data); //<- you can share data across namespaces
  })


})

//CLOSED NAMESPACE
const closedNamespace = io.of('/closed');
closedNamespace.on("connect", (socket)=> {
  console.log("socket connected to CLOSED : ", socket.id);
  console.log("total people in CLOSED : ", closedNamespace.sockets.size  );
  socket.on("disconnect", ()=> {
    console.log("socket disconnected from CLOSED : ", socket.id);

    console.log("total people in CLOSED : ", closedNamespace.sockets.size  );
  })
  socket.on("msg", (data)=> {
    closedNamespace.to(socket.roomNo).emit("msg",data);
  })

  //when client asks to join a room
  socket.on("joinRoomRequest",(data)=> {
    socket.join(data.roomNo);
    socket.roomNo = data.roomNo; //save the room number within the socket
  })


})


server.listen(3000, ()=> {
  console.log("server listening at 3000");
});                // listen on server, NOT app