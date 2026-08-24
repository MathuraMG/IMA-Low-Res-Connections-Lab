## NOTE on the socket.io update:
* The videos associated with this code use an older version of socket.io --> v2.0.
* Now, we are using a later version socket.io --> v4.0
* What this means in terms of the code is that, we USED to use
`let io = require('socket.io').listen(server);`
as the way to set up the socket on the server side.
* From NOW, we will use this instead -->
`let io = require('socket.io');
io = new io.Server(server);`

# STEPS - Setup the required files/ folders/ connections

1. Setup the express server with a public folder

2. Create multiple views within the public folder

3. Setup multiple namespaces in the server side - one for "input", and one for "output"


# STEPS - Send information across the socket

1. Get question button
* sending a "ping" from the output client to the server
* server sends back question + answer to the output client
* server sends back question + options to the input clients

2. What happens when user selects answer
* user selects answer, send the answer to server
* server will check if answer is correct, and let the client know
* input client needs to be informed if answer is right or wrong

3. Get answer button
* output client emits a ping on button press
* server gets the ping, and send "answer" info to the output clients
* output clients displays this informations

# NEXT STEPS
1. Can you add properties to the socket object so that each socket has its own name + answer information ( add a trivia property? )
1. Create a GET route for a question creation page
