console.log("1 - Loading!");

let astroDrawData = [];


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
            astroNumber = data.number;
            console.log(astroNumber);

            let numEl = document.querySelector('#data-container');
            numEl.innerText = astroNumber;

            for (let i = 0; i < astroNumber; i++) {
                let curAstro = {};
                curAstro.x = random(100, window.innerWidth-100);
                curAstro.y = random(100, window.innerHeight-100);
                curAstro.d = random(50, 150);
                astroDrawData.push(curAstro);
                console.log(astroDrawData);
            }
        });
});

console.log("3 - End of javascript file");

function setup() {
    const myCanvas = createCanvas(window.innerWidth, window.innerHeight);
    myCanvas.parent("canvas-container");
}

function draw() {
    //Check to make sure there are objects in the array
    if (astroDrawData.length > 0) {
        //console.log("YES!")
        fill(150, 150, 250);
        noStroke();
        for (let i = 0; i < astroDrawData.length; i++) {
            ellipse(astroDrawData[i].x, astroDrawData[i].y, astroDrawData[i].d);
        }
    }
}