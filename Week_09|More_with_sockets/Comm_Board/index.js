let express = require('express');
let app = express();
app.use('/', express.static('public'));

let messages = {
  "pizza" : [
    " I like pizza",
    "pizza is great",
    "pinnaples forever!"
  ],
  "pie" : [
    "PIE PIE PIE"
  ],
  "cake" : [
    "Cake is the best dessert ever"
  ]
}

//Initialize the actual HTTP server
let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});

//Initialize socket.io
let io = require('socket.io');
io = new io.Server(server);

io.on('connect', (socket) => {
  console.log('socket connected : ' + socket.id);


  // on getting a choice of room to join
  socket.on('joinroom', (data) => {
    console.log(io.sockets.adapter.sids);
    if(socket.room) {
      socket.leave(socket.room);
    }
    socket.join(data.room);
    socket.room = data.room;
    socket.emit('messages',messages[socket.room]);
  })

  //on receiving message from the client - add it to the appropriate data object + send it all other clients in the room
  socket.on('message', (data) => {
    console.log(data.message);
    //add this message to the data object
    if(socket.room) {
      messages[socket.room].push(data.message);
      //send to all other clients in this room
      console.log(socket.room);
      io.to(socket.room).emit('message',{
        'message' : data.message
      })
    }

  })
})
