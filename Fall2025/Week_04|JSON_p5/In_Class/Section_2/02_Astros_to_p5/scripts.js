console.log("1 - Loading!");

let astroEllipses = [];

//Wait for the entire page to load before doing these things
window.addEventListener('load', () => {

    console.log("The page is ready!");

    //Fetch astronaut data
    fetch('http://api.open-notify.org/astros.json')
        .then(response => response.json())
        .then(data => {
            console.log("2 - We have the data!!!");
            //console.log(data);

            //add the data to the page
            let astroNumber = data.number;
            //console.log(astroNumber);

            let numEl = document.querySelector('#data-container-2');
            numEl.innerText = astroNumber;

            //create astronaut objects, add to the array
            for (let i = 0; i < astroNumber; i++) {
                let curAstro = {};
                curAstro.x = random(0, window.innerWidth);
                curAstro.y = random(0, window.innerHeight);
                curAstro.d = random(20, 100);
                astroEllipses.push(curAstro);
            }
            console.log(astroEllipses);
        });
});

console.log("3 - End of javascript file");

// -------p5 code-------
function setup() {
    const myCanvas = createCanvas(window.innerWidth, window.innerHeight);
    myCanvas.parent('canvas-container');
}

function draw() {
    noStroke();
    fill(150, 150, 225, 50);
    if (astroEllipses.length > 0) {
        for (let i = 0; i < astroEllipses.length; i++) {
            ellipse(astroEllipses[i].x, astroEllipses[i].y, astroEllipses[i].d);
        }
    }
}

// function mouseMoved(){
//     noStroke();
//     fill(150, 150, 225, 50);
//     ellipse(mouseX, mouseY, 50,50);
// }