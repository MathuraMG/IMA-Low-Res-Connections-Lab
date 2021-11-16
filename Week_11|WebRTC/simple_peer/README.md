**NOTE:** In a real-world application, you would **NEVER** do this. The sender and receiver Peer instances would exist in separate browsers. A "signaling server" (usually implemented with websockets) would be used to exchange signaling data between the two browsers until a peer-to-peer connection is established.

# CODING STEPS
### Setup SimplePeer Client-side
1. Create peer connection objects
2. Share signaling data
3. Decide which of the peers is an initiator
4. Establish data connection
5. Send some data (on 'connect')

### NEXT STEPS
1. Add video stream (on 'stream')