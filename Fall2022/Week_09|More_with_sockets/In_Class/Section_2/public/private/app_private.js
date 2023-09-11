//STEP 4. SOCKET CONNECTION
let socket = io('/private');
let r;
let g;
let b;
let size;

//Prompt users to enter the room name
window.addEventListener('load', ()=>{
  let roomName = window.prompt('Enter room name:');

  let roomObj = {
    room: roomName
  }

  socket.emit('room-name', roomObj);
});

//Connect socket client
socket.on('connect', () => {
  console.log('Connected');
});

//STEP 8. Listen for data from the server
socket.on('data', (data) => {
  console.log(data);

  //draw with data coming in
  drawObj(data);
});

//STEP 10.4 CHANGE COLOR ON MOUSE CLICK
socket.on('colorChange', () => {
  r = random(255);
  g = random(255);
  b = random(255);
  size = random(50);
});

socket.on('joined', (data) => {
  console.log(data.msg);
});

//STEP 1. p5 code
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(150);

  //assign random values
  r = random(255);
  g = random(255);
  b = random(255);
  size = random(50);
}

function mouseMoved() {
  let mousePos = {
    x: mouseX,
    y: mouseY,
    r: r,
    g: g,
    b: b,
    size: size
  }

  //STEP 5. EMIT DATA TO THE SERVER
  socket.emit('data', mousePos);
}

function drawObj(obj) {
  noStroke();
  fill(obj.r, obj.g, obj.b);
  ellipse(obj.x, obj.y, obj.size);
}

//STEP 10.1 Change color on mouse click
function mousePressed() {
  //send a ping to the server that color changed
  socket.emit('colorChange');
}