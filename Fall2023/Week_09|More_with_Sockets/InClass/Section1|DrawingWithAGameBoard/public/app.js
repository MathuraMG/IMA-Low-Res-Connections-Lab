let socket = io();
let myColour = [];
let mySqObjects = [];
let sqSize = 10;

window.addEventListener("load", ()=> {
  let startButton = document.getElementById("startButton");
  // start the sq objects everytime the start button is clicked. A message is sent to the server asking for a new set of sqObjects.
  startButton.addEventListener("click",() => {
    console.log("clicked")
    socket.emit("start",{});
  })
})

socket.on("connect", ()=> {
  console.log("Connected");
})

function setup() {
  createCanvas(400,400);
  background("#fff");
  myColour = [random(255),random(255),random(255)];

  socket.on("mouseDataServer", (data)=> {
    
    drawPos(data);
  })
  //everytime sqObjects is updated, the local array "mySqObjects" will get updated
  socket.on("setSqObjects",(data)=> {
    background("#fff");
    console.log(data);
    mySqObjects = data.sqObjects;
  })

  socket.on("sqObjectsFromServer", (data)=> {
    //set the local objects to the update info from the client;
    mySqObjects = data.sqObjects;
  })
}

function mouseMoved() {
  let mousePos = {
    x : mouseX,
    y: mouseY,
    colour: myColour
  }
  socket.emit("mouseData", mousePos);

  //check if mouse is touching any square
  for(let i =0;i<mySqObjects.length;i++) {
    
    if(mouseX >mySqObjects[i].x && mouseX < mySqObjects[i].x +sqSize && mouseY >mySqObjects[i].y && mouseY < mySqObjects[i].y +sqSize) {
      mySqObjects[i].touched = true;
      let data = {
        "sqObjects" : mySqObjects
      }
      //send updated sqObjects to server
      socket.emit("sqObjectsFromClient", data);
    }
  }
}



function drawPos(data) {
  noStroke();
  fill(data.colour);
  ellipse(data.x, data.y, 10,10);
}


function draw() {
  // keep drawing the local "mySqObjects"
  drawAllSqObjects();
}

//function to draw the objects

function drawAllSqObjects() {
  stroke(0);
  for(let i =0;i<mySqObjects.length;i++) {
    if(mySqObjects[i].touched == false) {
      fill(255);
    } else {
      fill(0);
    }
    rect(mySqObjects[i].x, mySqObjects[i].y, sqSize,sqSize);
  }
}

/*

FLOW OF INFO!!!!!

First the user hits the "START" button. When they do so
* Client emits "start" to the server. No data is sent
* Server on rx "start" populates the object "sqObjects" with 10 random position information. These 10 objects also have a value called "touched" which is set to false to start with
* Server emits "setSqObjects" to the client. It sends to sqObjects data along with it
* Client on rx "setSqObjects", updates the local object "mySqObjects" to match what came from the server. It also sets the background of the canvas to white which clears the canvas
* NOTE: Client side has a draw function that is constantly drawing the squares based on "mySqObjects"

Now the user moves mouse 
* Client emits "mouseData" with the mousePos data 
* Server on rx "mouseData" emits "mouseDataServer" to all clients
* Client on rx "mouseDataServer" draws the ellipse
The last 3 steps are the same as last class. NOW WE ARE DOING ADDITIONAL STEPS
* Client is checking if the mouse is colliding with any of the squares in "mySqObjects". If yes, it updates "mySqObjects" and emits "sqObjectsFromClient" to the server. This contains data from "mySqObjects"
* Server on rx "sqObjectsFromClient", emits "sqObjectsFromServer" wwith the same data to all clients
* Client on rx "sqObjectsFromServer" updates the lcocal "mySqObjects"
Local code ensures that if an object has been collided/touched, it will be drawn in black.

*/