console.log("Hello!");

//Establish a socket connection
let socket = io();

//Listen for confirmation of connection
socket.on('connect', () => {
    console.log("Connected");
});

let myR;
let myG;
let myB;

//p5 code
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);

    myR = random(255);
    myG = random(255);
    myB = random(255);

    //Listen for dataAll event
    socket.on('dataAll', (obj) => {
        console.log(obj);
        drawPos(obj);
    });

    //Listen for dataPressAll event
    socket.on('dataPressAll', (obj) => {
        console.log(obj);
        drawPress(obj);
    });
}

function mouseMoved() {
    // fill(0);
    // ellipse(mouseX, mouseY, 5, 5 );

    let mousePos = {
        x: mouseX,
        y: mouseY,
        r: myR,
        g: myG,
        b: myB
    };
    socket.emit('data', mousePos);
}

function mousePressed() {
    let mousePress = {
        x: mouseX,
        y: mouseY,
        r: myR,
        g: myG,
        b: myB
    };
    socket.emit('dataPress', mousePress);
}

//Expects an object with x and y properties
function drawPos(pos) {
    noStroke();
    fill(pos.r, pos.g, pos.b);
    ellipse(pos.x, pos.y, 10, 10);
}

function drawPress(pos) {
    noStroke();
    fill(pos.r, pos.g, pos.b);
    ellipse(pos.x, pos.y, 50, 50);
}