let socket = io();

socket.on("connect", ()=> {
  console.log("Connected");
})

function setup() {
  createCanvas(400,400);
  background("#fff");

  socket.on("mouseDataServer", (data)=> {
    
    drawPos(data);
  })

}

function mouseMoved() {
  let mousePos = {
    x : mouseX,
    y: mouseY
  }
  socket.emit("mouseData", mousePos);
}



function drawPos(data) {
  ellipse(data.x, data.y, 5,5);
}



