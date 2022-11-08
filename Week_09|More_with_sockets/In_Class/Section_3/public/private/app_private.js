//Open and connect socket
let socket = io('/private');

//Listen for confirmation of conection
socket.on('connect', () => {
    console.log("Connected!");
});

//Get room name
let roomName = window.prompt("Create or Join a room");
console.log(roomName);

//Check if a name was entered
if (roomName){
    //Emit Msg to join the room
    socket.emit('room', {"room": roomName});
}
else {
    alert("Please refresh and enter a room name");
}

let myR;
let myG;
let myB;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);

    noStroke();

    //create random integer values for this client's color
    myR = random(255);
    myG = random(255);
    myB = random(255);

    //Listen for a message from the server
    socket.on('dataAll', (obj) => {
        console.log("DataAll message received!!!")
        console.log(obj);
        drawPos(obj);
    });

    //Listen for a message from the server
    socket.on('pressedAll', (obj) => {
        console.log("PressedAll message received!!!")
        console.log(obj);
        drawPress(obj);
    });
}

function draw() {
}

function mouseMoved() {
    // fill(0);
    // ellipse(mouseX, mouseY, 10,10);

    let mousePos = {
        x: mouseX,
        y: mouseY,
        r: myR,
        g: myG,
        b: myB
    };

    //Send a message to the server
    socket.emit('data', mousePos);
}

function mousePressed() {
    let pressPos = {
        x: mouseX,
        y: mouseY,
        r: myR,
        g: myG,
        b: myB
    };
    //Send a message to the server
    socket.emit('pressed', pressPos);
}

/*----- Functions to be called when clientside .on() events occur -----*/

//This will be called when a "dataAll" msg is received on the client
function drawPos(posObj) {
    fill(posObj.r, posObj.g, posObj.b);
    ellipse(posObj.x, posObj.y, 10, 10);
}

//This will be called when a "pressedAll" msg is received on the client
function drawPress(pressObj) {
    fill(pressObj.r, pressObj.g, pressObj.b);
    ellipse(width / 2, height / 2, 100, 100);
}