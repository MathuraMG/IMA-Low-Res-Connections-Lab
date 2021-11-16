/*STEP 5.5. Capture video stream on window load*/
window.addEventListener('load', () => {
  initCapture();
});

/*Global variables*/
let myLocalMediaStream;
let socket;
let myFriends = {};

/*STEP 5. Capture video stream*/
function initCapture() {
  console.log('init capture');

  /* STEP. 5.1. This element will display my webcam*/
  let videoEl = document.getElementById('myVideo');

  /*STEP 5.2. Video constraints for webcam to fulfill*/
  let constraints = { audio: true, video: true };

  /*STEP 5.3. Ask for user permission for camera*/
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(stream => { //when the stream is available
      //use the stream
      console.log(stream);
      //set to global variable
      myLocalMediaStream = stream;
      /*STEP 5.4. Attach to video object*/
      videoEl.srcObject = stream;

      //wait for the stream to load enough to play the video
      videoEl.onloadedmetadata = evt => {
        // console.log(evt);
        videoEl.play();
      };
    });

  /*STEP 6.5. Start socket connection*/
  setupSocket();
}

/*Step 6. Establish socket connection*/
function setupSocket() {
  /*STEP 6.1. Set to global object variable*/
  socket = io();

  socket.on('connect', () => {
    console.log('Client connected!');
    console.log('My socket id is: ', socket.id);

    /*STEP 6.2. Tell the server we want a list of all users*/
    socket.emit('list');
  });

  /*STEP 6.4. Receive a list of all socket ids*/
  socket.on('listresults', data => {
    //array of socket ids
    console.log(data);
    //6.4.1. Loop through all ids
    for (let i = 0; i < data.length; i++) {
      //6.4.2. Make sure the id is not my own id
      if (data[i] != socket.id) {
        let theirSocketId = data[i];
        //call all peer connections (since we are have just joined, we will be the initiator to connect with everyone else on the call)
        let peerConnection = setupConnection(true, theirSocketId);
        //6.4.3. Add to global peer connections object
        myFriends[data[i]] = peerConnection;
      }
    }
  });

  /*STEP 7.4. Receive signal or setup a new peer connection*/
  socket.on('signal', (to, from, data) => {
    console.log('Got a signal from the server: ', to, from, data);
    //'to' should be us
    if (to != socket.id) {
      console.log("Socket ids don't match");
    }

    //look for the right simplepeer in our array
    let connection = myFriends[from];
    //if peer exists in the peers object, send signal to it
    if (connection) {
      connection.signal(data);
      //otherwise setup connection to that particular peer
    } else {
      console.log('Never found right simplepeer object');
      //create a new object, it won't be the initiator, another peer will call us
      let theirSocketId = from;
      let peerConnection = setupConnection(false, theirSocketId);
      //add new connection to a global 'peers' object
      myFriends[from] = peerConnection;
      //attempt to establish a connection with the new peer that sent the initial signal
      console.log("Connecting to a new peer!");
      peerConnection.signal(data);
    }
  });
}

/*STEP 7. Setup peer connection*/
function setupConnection(initiator, theirSocketId) {
  /*STEP 7.1. Create a new peer connection object */
  let peerConnection = new SimplePeer({ initiator: initiator });

  /*STEP 7.2. Simplepeer generates signals which need to be sent across socket connection*/
  peerConnection.on('signal', data => {
    //Emit a signal event to the server
    socket.emit('signal', theirSocketId, socket.id, data);
  });

  /*STEP 7.5. When we have a connection, send our stream*/
  peerConnection.on('connect', () => {
    console.log('connect');
    console.log(peerConnection);

    //Let's give them our stream - add to the peer connection
    peerConnection.addStream(myLocalMediaStream);
    console.log('Send our stream');
  });

  /*STEP 7.6. Stream is coming to us*/
  peerConnection.on('stream', stream => {
    console.log('Incoming Stream');

    //create a new video object
    let theirVideoEl = document.createElement('video');
    theirVideoEl.id = theirSocketId;
    theirVideoEl.srcObject = stream;
    theirVideoEl.muted = true;
    theirVideoEl.onloadedmetadata = e => {
      theirVideoEl.play();
    }
    //attach to html
    document.body.appendChild(theirVideoEl);
  });

  /*STEP 7.6. When peer connection closes*/
  peerConnection.on('close', () => {
    console.log('Peer connection is closing');
    //Additionally can remove from the myFriends object
  });

  //on error
  peerConnection.on('error', err => {
    console.log(err);
  });

  /*STEP 7.7. Return peer connection to be able to use it elsewhere in STEP 6.4.3*/
  return peerConnection;
}
