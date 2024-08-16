console.log("Page is loading");

//Step 1. Make sure the page has loaded
window.addEventListener('load', () => {
  console.log("Page has loaded");

  //Step 2. Send a request for data
  fetch("http://api.open-notify.org/astros.json")
    .then(response => { //Receive a response object that includes information about the data (status of the request)
      return response.json(); //return json inside the response object
    })
    .then(data => { //Step 3. Access the data
      console.log(data);
      //Set the data to a global variable
      astroData = data;
    })
    .catch(function (error) {
      console.log(error);
    });
});

let astroData;

/*p5 CODE */
function setup() {
  console.log('Setup is working!');

  let myCanvas = createCanvas(800, 400);
  background(144, 238, 144);

  //attach to a container
  myCanvas.parent('data_container');
}

function draw() {
  // console.log(astroData);
  //Make sure the data is ready
  if (astroData) {
    //Then show the ellipses on the page
    for (let i = 0; i < astroData.number; i++) {
      ellipse(30 + i * 35, 150, 30);
    }
  } else {
    console.log('Data is not ready yet!');
  }
}

/*Show names when clicked */
function mousePressed() {
  for (let i = 0; i < astroData.number; i++) {
    //count the distance from mouse to the circle - https://p5js.org/reference/#/p5/dist
    let d = dist(mouseX, mouseY, 30 + i * 35, 150);
    if (d < 15) { //15 is ellipse radius
      clear();
      background(144, 238, 144);
      textSize(20);
      text(astroData.people[i].name, 15 + i * 35, 100);
    }
  }
}


