console.log('The page is loading');

//Step 1. Make sure the page loads first
window.addEventListener('load', () => {
  console.log('The page has loaded');

  //Step 2. Send request for data
  fetch("http://api.open-notify.org/astros.json")
  //Step 3. Receive a response object that includes the information about the data (request status) - A PROMISE
  .then(response => {
    //Return the json inside the response object
    return (response.json());
  })
  //Step 4. Access the data
  .then(data => {
    astroData = data;
    astronauts = data.people;

  })
  .catch(error => {
    console.log(error);
  });

});

/*P5 CODE */
let astroData;
let astronauts;

function setup(){
  let myCanvas = createCanvas(800, 400);
  background(150);

  myCanvas.parent('data_container')
}

function draw(){
  //check if data is ready
  if(astroData){
    for(let i=0; i<astroData.number; i++){
      ellipse(30+i*35, 150, 30);
    }
  } else{
    console.log('Data is not ready yet');
  }

}

function mousePressed(){
  for (let i=0; i<astroData.number; i++){
    let d = dist(mouseX, mouseY, 30+i*35, 150);
    console.log(d);
    if(d<30){
      clear();
      background(150);
      textSize(20);
      text(astronauts[i].name, 30+i*35,100);
    }
  }
}
