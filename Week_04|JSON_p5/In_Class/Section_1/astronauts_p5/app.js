console.log('The page is running');
let astroData;

//Make sure the page has loaded
window.addEventListener('load', function () {
  console.log('The page has loaded');

  fetch('http://api.open-notify.org/astros.json')
    .then(function (response) {
      // console.log(response);
      let json = response.json();
      return json;
    })
    .then(function (data) { //get access to the data
      console.log(data);
      // console.log(data.people.length);

      //assign this data to a global variable
      astroData = data;
    })
    .catch(function (error) {
      console.log(error);
    });
});

/* p5 code */

function setup() {
  console.log('Set up is working!!');
  let myCanvas = createCanvas(800, 400);
  background(150, 150, 150);
  myCanvas.parent('canvas-container');
  console.log(astroData);
}

function draw() {
  noStroke();
  // ellipse(50, 100, 30);
  // console.log(astroData);
  if (astroData) {
    for (let i = 0; i < astroData.people.length; i++) {
      ellipse(50 + i * 50, 100, 30);
      // text(astroData.people[i].name, i*50, 50);
    }
  } else {
    console.log("There's no data yet");
  }

}
