console.log("Hello!");

//Input room name
let roomName = window.prompt("Create or Join a room");
console.log(roomName);

//Initialize and connect socket
let socket = io('/private');

//Listen for confirmation of connection
socket.on('connect', () => {
    console.log("Connected");

    //Check if a name was entered
    if (roomName) {
        //Emit a msg to join the room
        socket.emit('room', { "room": roomName });
    }
    else {
        alert("Please refresh and enter a room name");
    }
});

//Listen for an event named 'message-share' from the server
socket.on('message-share', (data) => {
    //console.log(data);
    drawEllipse(data);
});

//In global scope
let myRed, myGreen, myBlue;
let myDiameter;

function setup() {
    createCanvas(windowWidth, windowHeight);

    //Inside setup
    //Generate random fill values
    myRed = random(0, 255);
    myGreen = random(0, 255)
    myBlue = random(0, 255);

    //Generate random ellipse size
    myDiameter = random(5, 50);
}

function mouseMoved() {
    //Grab mouse position
    //let mouseData = { x: mouseX, y: mouseY };

    let mouseData = {
        x: mouseX,
        y: mouseY,
        r: myRed,
        g: myGreen,
        b: myBlue,
        d: myDiameter
    };

    //Send mouse data object to the server
    socket.emit('message', mouseData);

    //Draw yourself? Wait for server?
    //fill(0);
    //ellipse(mouseX, mouseY, 10, 10);
}

//Expects an object with x and y properties
function drawEllipse(obj) {
    fill(obj.r, obj.g, obj.b);
    noStroke();
    ellipse(obj.x, obj.y, obj.d, obj.d);
}