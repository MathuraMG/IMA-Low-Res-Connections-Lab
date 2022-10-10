//define this in the global scope so we can access it anywhere
let astroData;

window.addEventListener('load', function () {
    fetch("http://api.open-notify.org/astros.json")
    .then(response => response.json())
    .then(data => {
        console.log("Astronaut Data has arrived!");
        console.log(data);
        astroData = data;
    });
});

/*----- p5 Code down here -----*/
function setup(){
    createCanvas(window.innerWidth,window.innerHeight);
    background(200,50,100);
}

//a variable to help plot the ellipses
let spacingX;

function draw(){
    if (astroData){
        spacingX = Math.floor(width/astroData.people.length);
        for (let i = 0; i < astroData.people.length; i++){
            ellipse(spacingX/2 + i*spacingX, height/2, spacingX/2);
        }
    }
}

function mouseMoved(){
    for (let i = 0; i < astroData.people.length; i++){
        let d = dist(mouseX, mouseY, spacingX/2 + i*spacingX, height/2);
        if (d < spacingX/2){
            console.log(astroData.people[i].name);
 
            //Add text to the p5 sketch
            clear()
            background(200,50,100);
            textSize(16);
            text(astroData.people[i].name, i*spacingX - spacingX/2, height/2 + height/8);

            //Add text to a DOM element
            document.getElementById("name").innerHTML = astroData.people[i].name;
        }
    }
}

//This is called anytime the browser window is resized
function windowResized(){
    resizeCanvas(window.innerWidth,window.innerHeight);
    background(200,50,100);
}