window.addEventListener("load", function(){
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
            ellipse(150 + (i * 100), 150, 75);
        }
    }
    else{
        console.log("Not yet!");
    }
}