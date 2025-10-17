let socket;
let userName;
let users = {};

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  // Ask for user's name
  userName = prompt("Please enter your name:", "Anonymous");
  if (!userName) userName = "Anonymous";

  // Open and connect socket
  socket = io();

  // Listen for confirmation of connection
  socket.on('connect', function() {
    console.log("Connected");
    // Send initial user data
    socket.emit('userData', { name: userName, x: mouseX, y: mouseY });
  });

  // Listen for messages named 'userData' from the server
  socket.on('userData', function(data) {
    users[data.id] = data;
  });

  // Listen for user disconnection
  socket.on('userDisconnected', function(userId) {
    delete users[userId];``
  });
}

function draw() {
  background(255);

  // Draw all users
  for (let id in users) {
    let user = users[id];
    fill(0);
    ellipse(user.x, user.y, 10, 10);
    textAlign(CENTER, BOTTOM);
    text(user.name, user.x, user.y - 10);
  }
}

function mouseMoved() {
  // Update and send user position
  if (socket) {
    socket.emit('userData', { name: userName, x: mouseX, y: mouseY });
  }
}
