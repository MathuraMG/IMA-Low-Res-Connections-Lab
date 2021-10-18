//Initialize the express 'app' object
let express = require('express');
let app = express();
app.use('/', express.static('public'));

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

//Initialize private room namespace
//Allows us to better manage the rooms
let private = io.of('/private');

//Listen for users connecting to main page
io.sockets.on('connection', function(socket) {
    console.log("We have a new client: " + socket.id);

    //Listen for a message named 'msg' from this client
    socket.on('msg', function(data) {
        //Data can be numbers, strings, objects
        console.log("Received a 'msg' event");
        console.log(data);

        //Send a response to all clients, including this one
        io.sockets.emit('msg', data);
    });

    //Listen for this client to disconnect
    socket.on('disconnect', function() {
        console.log("A client has disconnected: " + socket.id);
    });
});

//Listen for users connecting to private page
private.on('connection', function(socket){
    console.log("We have a new private client: " + socket.id);

    socket.on('room', function(data){
        let roomName = data.room;
        console.log("Create/Join Room: " + roomName);
        //Add this socket to the room
        socket.join(roomName);
        //Add a room property to the individual socket
        socket.room = roomName;
        //Let everyone in the room know that a new user has joined
        let joinMsg = "A new user has joined the chat room: " + roomName;
        private.to(roomName).emit("joined", {msg: joinMsg });
    });

    //Listen for a message named 'msg' from this client
    socket.on('msg', function(data) {
        //Data can be numbers, strings, objects
        console.log("Received a 'msg' event");
        console.log(data);

        let roomName = socket.room;
        //Send a response to all clients, including this one
        private.to(roomName).emit('msg', data);
    });

    //Listen for this client to disconnect
    socket.on('disconnect', function() {
        console.log("A client has disconnected: " + socket.id);
    });
});
