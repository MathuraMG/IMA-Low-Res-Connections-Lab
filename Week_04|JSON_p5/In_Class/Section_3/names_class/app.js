console.log("Page is loading");
let astroData;
console.log(astroData);

let astronauts = [];

//1. Make sure the page loads first
window.addEventListener('load', function () {
  console.log("Page has loaded.");

  // 2. Request data
  fetch("http://api.open-notify.org/astros.json")
  .then(function(response){ //3. Then get the status of the request
    // console.log(response);
    return response.json()
  })
  .then(function(data){ //4. Then access the data
    console.log(data);

    astroData = data;
    console.log(astroData);

    for(let i=0; i<astroData.number; i++) {
      let astroName = astroData.people[i].name;
      astronauts[i] = new Ellipse(i, astroName);
    }

   
  //   //5. Do something with the data
  //   let astroNumber = data.number;
  //   let astronauts = data.people;
  //   // console.log(astroNumber)
  //   // console.log(astronauts)

  //   //Add the number to the page
  //   let numberPar = document.createElement('p');
  //   numberPar.innerHTML = astroNumber;

  //   //Append number par to html
  //   let containerSection = document.querySelector('section');
  //   containerSection.appendChild(numberPar);

  //   //Add styling to the number
  //   numberPar.setAttribute('class', 'astronaut_number');

  //   //Add the astronaut names
  //   for(let i=0; i<astronauts.length; i++){
  //     console.log(astronauts[i]);
  //     let astronaut = astronauts[i].name;

  //     //create a new span element for each astronaut
  //     let astroSpan = document.createElement('span');
  //     astroSpan.innerHTML = astronaut;

  //     //attach to the same container
  //     containerSection.appendChild(astroSpan);

  //     astroSpan.setAttribute('class', 'astronaut_name');
  //   }
  })
  // .catch(function(error){
  //   console.log(error);
  // });
});


/* p5 code */
function setup(){
  console.log('Setup is working!');
  let myCanvas = createCanvas(800, 400);
  background(144, 238, 144);
  myCanvas.parent('data_container'); // attach it to a container
}

function draw(){
  // console.log(astroData);

  // make sure the data is ready
  if(astroData){

  // show astronaut ellipses on the page
    for(let i=0; i<astroData.number; i++){

      // draw an ellipse
      ellipse(30 + i*35, 150, 30);
    }

  }else{
    console.log('Data is not ready yet!')
  }
}

function mousePressed(){
  for(let i=0; i< astronauts.length; i++){
    astronauts[i].showName();
  }
}

/*  class code */
class Ellipse {
  constructor(x, name) {
    this.x = x;
    this.name = name;
  }
  
  display(){
    noStoke();
    fill(255);
    ellipse(50 + this.x * 55, 150, 50);
  }

  showName() {
    let d = dist(mouseX, mouseY, 30 + this.x * 35, 150);
    if (d < 25){
      console.log('clicked');
      clear();
      background(144, 238, 144);
      textSize(20);
      text(this.name, 30 + this.x * 35, 100);

    }
  }
}