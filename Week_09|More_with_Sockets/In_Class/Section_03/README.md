## Socekt.io - Drawing App Continued
### Adding Namespaces and Rooms
-----
### GOALS
- Make sense of Namespaces
- Make sense of Rooms

-----
### PART 1 - SETUP
1. Download this entire repository
2. `cd` via the command line to the project folder
3. Run `npm install` to load dependencies listed in package.json
4. Open two browser windows both pointing to `localhost:3000` to make sure the app is working

----
### PART 2 - NAMESPACES
5. **CLIENT** - Create a new page for "private" drawing. 
    - Create a new folder inside the "public" folder. You can name it "private".
    - Make copies of the current html, css and js files in the public folder and place them in this folder.
    - Rename `app.js` to to `app_private.js` and update the `index.html` file to point to this js file.
    - Go to `localhost:3000/private` to make sure it is working.

6. **CLIENT** - Create a unique namespace for this new private page. 

    - Replace `let socket = io();` with `let socket = io('/private');`

7. **SERVER** - Create a unique namespace for the new private page. Add the following code to index.js:
``` 
//Create another namespace named 'private'
let private = io.of('/private');
```
8. **SERVER** - Update the logic for this "priavte" namespace
    - Copy the entire `io.on()` function and then change `io` to `private`.
    - `io.on` should be changed to `private.on` and `io.emit` should be changed to `private.emit`

----
### PART 3 - ROOMS
9. **CLIENT** - Allow users to create or join a room. You can use `window.prompt()` to input a room name.
```
//Input room name
let roomName = window.prompt("Create or Join a room");
console.log(roomName);
```
10. **CLIENT** - Send the room name to the Server. Add this code inside the `.on('connect')` once the socket connection is confirmed.
```
//Check if a name was entered
if (roomName){
    //Emit a msg to join the room
    socket.emit('room', {"room": roomName});
}
else {
    alert("Please refresh and enter a room name");
}
```
11. **SERVER** - Receive the room name on the Server within the **private** namespace
```
socket.on('room', (data) => {
  console.log(data.room);
  let roomName = data.room;

  //Code for Steps 12 & 13 go here

});
```
12. **SERVER** - Add the room name as a property to the socket
```
//Add a room property to the individual
socket.room = roomName;
```
13. **SERVER** - Add the socket to the room using `.join()`
``` 
//Add socket to room
socket.join(roomName);
```
14. **SERVER** - (OPTIONAL) Send a message to the client confirming the newly joined socket
15. **SERVER** - Update any `.emit()` functions in the private namespace to send data to the appropriate room
```
let currentRoom = socket.room
private.to(currentRoom).emit('message-share', data);
```
Note, `'message-share'` was the name we assigned to the emit. You can assign any name you like, you just need to make sure it is named the same in the `.on()` on the Client.

----
### PART 4 - PUSH TO GITHUB USING VS CODE SRC CONTROL / GITHUB DESKTOP

----
### PART 5 - DEPLOY TO RAILWAY / RENDER
