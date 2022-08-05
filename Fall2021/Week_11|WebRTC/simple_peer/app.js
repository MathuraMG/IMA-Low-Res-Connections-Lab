//Step 1. Create peer connection objects
//Step 3. Decide which peer is a connection initiator
let peer1 = new SimplePeer({initiator: true});
let peer2 = new SimplePeer();

//Step 2. Share signaling data between 2 peers
peer1.on('signal', data => {
  console.log("Peer 1 received signaling data: ", data);
  peer2.signal(data);
});

peer2.on('signal', data => {
  console.log("Peer 2 received signaling data: ", data);
  peer1.signal(data);
});

//Step 4. Establish data connection
peer1.on('data', data => {
  console.log('Peer 1 got a message', data.toString());
});

peer2.on('data', data => {
  console.log('Peer 2 got a message', data.toString());
});

//Step 5. Send some data
peer1.on('connect', () => {
  peer1.send('Hello Peer 2, happy to connect!')
});

peer2.on('connect', () => {
  peer2.send('Hello Peer 1, happy to connect!')
});

