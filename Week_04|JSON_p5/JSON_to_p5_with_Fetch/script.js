window.addEventListener("load", () => {
    let dataURL = "http://api.open-notify.org/astros.json";
    fetch(dataURL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //Do work
            astroData = data;
        });
});

/*----- p5 Code ------*/
//Declared in the Global Scope
let astroData;

function setup(){
    console.log("Setup!");
    createCanvas(600, 400);
    background(200, 80, 110);
}

function draw(){
    //Returns 'true' once astroData is assigned an actual value
    if (astroData){
        for (let i=0; i < astroData.number; i++){
            ellipse(20 + (i * 40), 150, 30);
        }
    }
    else{
        console.log("Not yet!");
    }
}
