// I want this client to connect to the public namespace
let socket = io("/public");


let myColour = [];
let mySize;
socket.on("connect", ()=> {
  console.log("Connected");
})

function setup() {
  createCanvas(400,400);
  background("#fff");
  myColour = [random(0,255), random(0,255), random(0,255)]
  mySize = random(2,20);
  socket.on("mouseDataServer", (data)=> {
    
    drawPos(data);
  })

  socket.on("warning",(data)=>{
    console.log("TOO MANY PEOPLE ON THE SERVER")
  })

}

function mouseMoved() {
  let mousePos = {
    x : mouseX,
    y: mouseY,
    colour: myColour,
    size: mySize
  }
  socket.emit("mouseData", mousePos);
}



function drawPos(data) {
  noStroke();
  fill(data.colour)
  ellipse(data.x, data.y, data.size, data.size);
}



