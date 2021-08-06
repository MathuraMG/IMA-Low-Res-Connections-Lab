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
let io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
    console.log("A new user has joined!");

   //Event - Listen for the  "position" msg
   socket.on('position', function(data){
        console.log(data);
        io.sockets.emit('positionUpdate',data);
   }); 

    // Event - Listen for the "change" msg
    socket.on("change", function(data){
       socket.broadcast.emit("forceChange",data)
   })

    //Listen for this client to disconnect
    socket.on('disconnect', function() {
        console.log("A client has disconnected: " + socket.id);
    });    

})
