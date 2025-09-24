console.log('The page is loading');

//1. Make sure the page loads first
window.addEventListener('load', function () {
  console.log('The page has loaded');

  //2. Request the data
  fetch("http://api.open-notify.org/astros.json")
    .then(function (response) { //3. Get teh status of the request
      return response.json() //parse teh data
    })
    .then(function (data) { //4. Access the data
      console.log(data);
      //assign to global variables
      astroData = data;
      astronauts = data.people;
    })
    .catch(function (error) { //log any errors
      console.log(error);
    });
});

/* p5 code */

let astroData;
let astronauts;

function setup() {
  console.log('Set up is working!');
  let myCanvas = createCanvas(800, 400);
  background(144, 238, 144);

  //attach to container
  myCanvas.parent('data_container')
}

function draw() {
  // console.log(data);
  if (astroData) {
    for (let i = 0; i < astronauts.length; i++) {
      noStroke();
      ellipse(30+i*55, 100, 50, 50);
      // textSize(10);
      // text(astronauts[i].name,i*60, 100);
    }
  } else {
    console.log('Data is not ready yet!');
  }
}

/*Show names when clicked */
function mousePressed(){
  for(let i=0; i<astronauts.length; i++){
    //count the distance from mouse to the circle - https://p5js.org/reference/#/p5/dist
    let d = dist(mouseX, mouseY, 30+i*55, 100);
    if(d<25){ //25 is ellipse radius
      clear();
      background(144, 238, 144);
      textSize(20);
      text(astronauts[i].name, 15+i*35, 50);
    }
  }
}
