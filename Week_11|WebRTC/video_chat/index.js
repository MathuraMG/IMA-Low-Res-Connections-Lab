/*Step 1.1. Establish an express app*/
let express = require('express');
let app = express();
app.use('/', express.static('public'));

/*Step 1.2. Generate security certificates in the command line*/
/* Note, this is not necessary if deploying to Glitch*/

/*Step 1.3. Get access to the file system*/
let fs = require('fs');

/*Step 1.4. Start a secure https server*/
let https = require('https');
//serve certificates
let serverOptions = {
  key: fs.readFileSync('local.key'),
  cert: fs.readFileSync('local.cert')
};
//create a server on the app object
let httpsServer = https.createServer(serverOptions, app);
//create a port variable and listen
let port = process.env.port || 443;
httpsServer.listen(port, ()=>{
  console.log('Server listening on port ', port);
});

/*STEP 2. Peers object to store peer ids*/
let peers = {};

/*STEP 3. Create a web socket server to send signaling messages*/
let io = require('socket.io');
io = new io.Server(httpsServer);

io.sockets.on('connection', (socket) => {
  console.log('We have a new client: ', socket.id);
  /*STEP 3.1. Add socket to 'peers' object*/
  peers[socket.id] = socket;

  /*STEP 6.3. Listen and get all peer ids*/
  socket.on('list', () => {
    //get an ids array
    let ids = Object.keys(peers);
    console.log(ids);

    //send all existing socket ids to this specific socket
    socket.emit('listresults', ids);
  });

  /*STEP 7.3. Relay signals back and forth*/
  socket.on('signal', (to, from, data) => {
    console.log('signal', to);

    //check if such peer exists in a 'peers' object
    if(to in peers){
      //send signal to that peer
      peers[to].emit('signal', to, from, data);
    }else{
      console.log('Peer not found');
    };
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected: ', socket.id);

    io.emit('peer_disconnect', socket.id);

    /*STEP 3.2. Delete from 'peers' object*/
    delete peers[socket.id];
  });
});
