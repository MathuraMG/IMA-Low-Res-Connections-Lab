CHAT APP WITH PRIVATE ROOMS
---------------------------
## NOTE on the socket.io update:
* The videos associated with this code use an older version of socket.io --> v2.0.
* Now, we are using a later version socket.io --> v4.0
* What this means in terms of the code is that, we USED to use
`let io = require('socket.io').listen(server);`
as the way to set up the socket on the server side.
* From NOW, we will use this instead -->
`let io = require('socket.io');
io = new io.Server(server);`

#### SETUP
* Step 1 - Start with single page Chat App - run `npm install` to load node packages, run `nodemon index.js` to launch the application

#### NAMESPACES
* Step 2 - Create a separate page with html and js for private chat

* Step 3 -  Create a unique namespace for the private chat page

#### ROOMS
* Step 4 - Create input on client for room name, use window.prompt

* Step 5 - Emit the “room name”

* Step 6 - Receive the “room name” on the server

* Step 7 - Use `.join()` to add socket to the room, the room will be created if it doesn't exist, add a “.room” property to socket

* Step 8 - Add an `.emit()` on the server to send the welcome message & add an `.on()` to the client to reveive the welcome message

* Step 9 - Refactor client-side code to manage chat msgs and welcome message

* Step 10 - Allow for private chat!

#### NEXT STEPS
* Step 11 - Store a user name

* Step 12 - Save the chat

* Step 13 - Allow users to change rooms
