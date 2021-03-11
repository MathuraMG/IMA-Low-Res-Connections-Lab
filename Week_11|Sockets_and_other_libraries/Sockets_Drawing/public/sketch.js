//Open and connect socket
let socket = io();
let flag = 0;


//Listen for confirmation of connection
socket.on('connect', function () {
  console.log("Connected");
});

function setup() {

  createCanvas(windowWidth, windowHeight);
  background(255);

  //Listen for messages named 'data' from the server
  socket.on('data', function (obj) {
    console.log(obj);
    drawPos(obj);
  });
}


function mouseMoved() {

  
  
  let mousePos = { x: mouseX, y: mouseY };
  //Send mouse position object to the server
  socket.emit('data', mousePos);

  //Draw yourself? or Wait for server?
  // fill(0);
  // ellipse(mouseX, mouseY 10, 10);

}
// //Expects an object with a and y properties
function drawPos(pos) {
  fill(0);
  ellipse(pos.x, pos.y, 10, 10);
}

function mousePressed() {
  let apple = 10;
  debugger;
}

function calculateWeightInMars(num) {
  //complex math
  console
}

