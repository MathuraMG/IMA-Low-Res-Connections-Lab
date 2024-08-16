// I want this client to connect to the public namespace
let socket = io("/private");

let myColour = [];
let mySize;
socket.on("connect", ()=> {
  console.log("Connected");
})

//get the room name
let roomNo = window.prompt("Create or Join a room");
console.log(roomNo);

if(roomNo) {
  let data = {
    "roomNo": roomNo
  }
  socket.emit("addToRoom", data);
} else {
  alert("Please refresh and enter room no");
}


function setup() {
  createCanvas(400,400);
  background("#fff");
  myColour = [random(0,255), random(0,255), random(0,255)]
  mySize = random(2,20);
  socket.on("mouseDataServer", (data)=> {
    
    drawPos(data);
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



/*
1. client enters room namne and sends to serverDONE 
2. server adds THAT client to the room
3. client does a drawing
4. server rx and sends to all the clients in THAT room

*/