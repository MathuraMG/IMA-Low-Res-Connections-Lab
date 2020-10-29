let socket = io();

//Listen for confirmation of connection
socket.on('connect', function() {
    console.log("Connected");
  });

let r;
let g;
let b;

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(255);

    //create random r,g,b values
    r = random(255);
    g = random(255);
    b = random(255);

    //Listen for "positionUpdate" msg form the servber
    socket.on('positionUpdate', function(data){
        console.log(data);
        drawPos(data);
    });

    //Listen for "forceChange" msg from the server
    socket.on('forceChange', function(data){
        //create random r,g,b values
        r = random(255);
        g = random(255);
        b = random(255);  
    })
}

function mouseMoved(){
    // fill(0); 
    // ellipse(mouseX, mouseY, 10,10);
    let mousePos = {
                    x: mouseX,
                    y: mouseY,
                    "red": r,
                    "green": g,
                    "blue": b
                };
                
    socket.emit('position', mousePos);
}

function drawPos(obj){
    //use the r,g,b values sent from the server
    fill(obj.red, obj.green, obj.blue); 
    ellipse(obj.x, obj.y, 10,10);
}

function mousePressed(){
    //create random r,g,b values
    r = random(255);
    g = random(255);
    b = random(255);
    
    socket.emit("change", {"msg": "change"});

}