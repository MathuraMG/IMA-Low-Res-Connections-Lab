# STEPS - Setup the required files/ folders/ connections

1. DONE | Setup the express server with a public folder

2. DONE | Create multiple views within the public folder

3. DONE | Setup multiple namespaces in the server side - one for "input", and one for "output"


# STEPS - Send information across the socket

1. DONE | Get question button
* DONE | sending a "ping" from the output client to the server
* DONE | server sends back question + answer to the output client
* DONE | server sends back question + options to the input clients

2. DONE | What happens when user selects answer
* DONE | user selects answer, send the answer to server
* DONE | server will check if answer is correct, and let the client know
* input client needs to be informed if answer is right or wrong

3. Get answer button
* DONE | output client emits a ping on button press
* DONE | server gets the ping, and send "answer" info to the output clients
* output clients displays this informations

# NEXT STEPS
1. Can you add properties to the socket object so that each socket has its own name + answer information ( add a trivia property? )
1. Create a GET route for a question creation page
