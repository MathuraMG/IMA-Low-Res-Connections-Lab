//define this in the global scope so we can access it anywhere
let astroData;

//array to hold the objects
let astronauts = [];

//a variable to help plot the ellipses
let spacingX;

window.addEventListener('load', function () {
    fetch("http://api.open-notify.org/astros.json")
        .then(response => response.json())
        .then(data => {
            console.log("Astronaut Data has arrived!");
            console.log(data);
            astroData = data;

            spacingX = Math.floor(width / astroData.people.length);
            //create objects
            for (let i = 0; i < astroData.people.length; i++) {
                let curAstro = new Astronaut(spacingX / 2 + i * spacingX, spacingX / 2, astroData.people[i].name);
                astronauts.push(curAstro);
            }
        });
});

/*----- p5 Code down here -----*/
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(200, 50, 100);
}

function draw() {
    for (let i = 0; i < astronauts.length; i++) {
        astronauts[i].display();
    }
}

function mouseMoved() {
    for (let i = 0; i < astronauts.length; i++) {
        astronauts[i].showName();
    }
}

//This is called anytime the browser window is resized
function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    background(200, 50, 100);
}

//Astronaut Class
class Astronaut {

    constructor(posX, radius, name) {
        this.posX = posX;
        this.radius = radius;
        this.name = name;
        this.posY = height / 2;
    }

    display() {
        ellipse(this.posX, this.posY, this.radius);
    }

    showName() {
        if (dist(mouseX, mouseY, this.posX, this.posY) < this.radius) {
            console.log(this.name);

            //Add text to the p5 sketch
            clear()
            background(200, 50, 100);
            textSize(16);
            text(this.name, this.posX - spacingX / 2, this.posY + height / 8);

            //Add text to a DOM element
            document.getElementById("name").innerHTML = this.name;
        }
    }

    resetValues() {
        spacingX = Math.floor(width / astronauts.length);
        this.posX = spacingX / 2 + i * spacingX;
        this.posY = height / 2
        this.radius = spacingX / 2;
    }
}