let socket = io();
let brushColour;
let size;

function setup() {
  createCanvas(500,500);
  background("#e35454");
  brushColour = random(0,255);
  size = random(10,40);
}

function mouseDragged() {
  //1. send this mouseData to the server - .emit() -> "mouseData"
  let data = {
    brushColour: brushColour,
    xPos : mouseX,
    yPos : mouseY,
    size : size
  }
  socket.emit("mouseData", data);
}

//4. listening for data from the server - .on getting "mouseData" --> DRAW!!
socket.on("mouseData", (data) => {
  console.log(data);
  noStroke();
  fill(data.brushColour);
  ellipse(data.xPos, data.yPos, data.size);
})


//listen for form submission
window.addEventListener("load", ()=> {
  document.getElementById("chat-input").addEventListener("submit", (e)=> {
    e.preventDefault();
    let msg = document.getElementById("chat-msg").value;
    console.log(msg);
    let msgObj = {msg: msg};
    //1. send chat data to server
    socket.emit("newMessage", msgObj);
  })
})

socket.on("newMessage", (data) => {
  console.log(data.msg);
})
