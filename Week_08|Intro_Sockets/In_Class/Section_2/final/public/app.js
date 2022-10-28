//STEP 4. SOCKET CONNECTION
let socket = io();
let r;
let g;
let b;
let size;

//Connect socket client
socket.on('connect', () =>{
  console.log('Connected');
});

//STEP 8. Listen for data from the server
socket.on('data', (data)=>{
  console.log(data);

  //draw with data coming in
  drawObj(data);
});

//STEP 10.4 CHANGE COLOR ON MOUSE CLICK
socket.on('colorChange', (data) => {
  console.log(data.msg);
  r = random(255);
  g = random(255);
  b = random (255);
  size = random(50);
});

//STEP 1. p5 code
function setup(){
  createCanvas(windowWidth, windowHeight);
  background(255);

  //assign random values
  r = random(255);
  g = random(255);
  b = random(255);
  size = random(50);
}

function mouseMoved(){
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

function drawObj(obj){
  noStroke();
  fill(obj.r, obj.g, obj.b);
  ellipse(obj.x, obj.y, obj.size);
}

//STEP 10.1 Change color on mouse click
function mousePressed(){
  //send a message to the server that something happened
  socket.emit('colorChange', {msg: "Change color"});
}
