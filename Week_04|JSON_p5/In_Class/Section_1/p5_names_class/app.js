console.log("Page is loading");

//1. Make sure the page loads first
window.addEventListener('load', function () {
  console.log("Page has loaded");

  //2. Request data
  fetch("http://api.open-notify.org/astros.json")
    .then(function (response) { //3. Then get the status of the request
      return response.json()
    })
    .then(function (data) { //4. Then access the data
      astroData = data;
      //Create new class objects and add it to the array
      for(let i=0; i<astroData.number; i++){
        let astroName = astroData.people[i].name;
        astronauts[i] = new Ellipse(i, astroName);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});

/* P5 CODE */
function setup() {
  console.log('Setup is working!')

  let myCanvas = createCanvas(800, 400);
  background(144, 238, 144)
  //attach to a container
  myCanvas.parent('data_container')
}

//Create a global variable
let astroData;
let astronauts = [];

function draw() {
  // console.log(astroData)
  if (astroData) {
    //loop through the data and draw ellipses
    for (let i = 0; i < astronauts.length; i++) {
      astronauts[i].display();
    }
  } else {
    console.log('Data is not ready yet!')
  }
}

/*Show names when clicked */
function mousePressed(){
  for(let i=0; i<astronauts.length; i++){
    astronauts[i].showName();
  }
}

/*CLASS CODE */
class Ellipse{
  constructor(x, name){
    this.x = x;
    this.name = name;
  }
  display(){
    noStroke();
    fill(255);
    ellipse(30 + this.x * 35, 150, 30)
  }
  showName(){
    //count the distance from mouse to the circle - https://p5js.org/reference/#/p5/dist
    let d = dist(mouseX, mouseY, 30+this.x*35, 150);
    if(d<15){ //15 is ellipse radius
      clear();
      background(144, 238, 144);
      textSize(20);
      text(this.name, 15+this.x*35, 100);
    }
  }
}

