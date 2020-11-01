CHAT APP WITH ROOMS
-------------------

#### SETUP
Step 1  Start with single page Chat App
        Run `npm install` to load the necessary node packages
        Run nodemon index.js to run the application

#### NAMESPACES
Step 2  Create a separate page with html and js for private chat

Step 3  Create a unique namespace for the private chat page 

#### ROOMS
Step 4  Create input on client for room name, use window.prompt

Step 5  Emit the “room name”

Step 6  Receive the “room name” on the server

Step 7  Use .join() to add socket to room, will the room if it doesn't exist , add a “.room” property to socket

Step 8  Send (.emot()) & the receive (.on) the welcome message

Step 9  Refactor client-side code to manage chat msgs and welcome message

Step 10 Allow for private chat!

#### NEXT STEPS
Step 11 Store a user name

Step 12 Save the chat

Step 13 Allow users to change rooms
