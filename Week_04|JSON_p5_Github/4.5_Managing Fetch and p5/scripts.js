//Global variable to store the data
let astroData;

//GLobal boolean values to help manage timing of p5 code
let dataIsReady = false;
let animationIsReady = false;

window.addEventListener("load", function(){
    let dataURL = "http://api.open-notify.org/astros.json";
    fetch(dataURL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            astroData = data;
            //Flip first boolean value to true
            console.log("Flipping first boolean value to true");
            dataIsReady = true;
        });
});

/*----- p5 Code ------*/
function setup(){
    console.log("Setup!");
    createCanvas(600, 400);
    background(200, 80, 110);
}

function draw(){

    if (dataIsReady){
        prepData();
    }

    if (animationIsReady){
        animateData()
    }
}

//This will be called only once in draw()
function prepData(){
    console.log("Preparing the data");

    //Add logic here to parse/organize the data

    //Flip first boolean value back to false
    console.log("Flipping first boolean value back to false");
    dataIsReady = false;
    //Flip second boolean value to true
    console.log("Flipping second boolean value to true");
    animationIsReady = true;
}

//This will be called repeatedly in draw()
function animateData(){
    //Add logic here to animate the data

}
