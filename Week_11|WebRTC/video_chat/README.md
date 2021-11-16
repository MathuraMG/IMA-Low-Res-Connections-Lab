# CODING STEPS

### High-Level Steps
1. Establish a server connection (each client separately using socket.io)
2. Establish peer connection with the help of the server: ‘signal’ event
3. Directly communicate peer to peer (no server is needed): ‘connect’, ‘stream’ and other events

### Specific Steps (see more details in the code comments)
#### Server-side
1. Create a secure https node server
2. Create a 'peers' object to store the ids of available peers
3. Create a websocket server to pass signaling messages

#### Client-side
4. Setup HTML
5. Capture video stream: `initCapture()` helper function
6. Establish socket connection: `setupSocket()` helper function
7. Setup peer connection: `setupConnection()` helper function