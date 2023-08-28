//STEP 2. SETUP
let express = require('express');
let app = express();
app.use('/', express.static('public'));

//http server
let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server is listening at localhost: ' + port);
});

//STEP 3. Socket connections
let io = require('socket.io');
io = new io.Server(server);

// const {Server} = require('socket.io');
// const io = new Server(server);

io.on('connection', (socket) => {
  // console.log(socket.id);
  console.log('A new client connected with the id: ' + socket.id)

  //STEP 6. LISTEN FOR DATA COMING IN
  socket.on('data', (data) => {
    //send data back to the client
    console.log(data);
    //STEP 7. send to all clients, including us
    io.emit('data', data);

    //send to all clients, except us
    // socket.broadcast.emit('data', data);

    //send to us only
    // socket.emit('data', data);
  });

  //STEP 10.2 LISTEN FOR COLOR CHANGE
  socket.on('colorChange', () => {
    //10.3. SEND BACK TO THE CLIENTS
    io.emit('colorChange');
  });

  //on disconnect
  socket.on('disconnect', ()=>{
    console.log('A client disconnected: ' + socket.id);
  });
});
