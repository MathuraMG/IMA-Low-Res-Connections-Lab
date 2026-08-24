console.log("Page is loading");

let astroData;

//Step 1. Make sure the page has loaded
window.addEventListener('load', () => {
  console.log("Page has loaded");

  //Step 2. Send a request for data
  fetch("http://api.open-notify.org/astros.json")
    .then(response => { //Receive a response object that includes information about the data (status of the request)
      return response.json(); //return json inside the response object
    })
    .then(data => { //Step 3. Access the data
      //Assign data to a global variable
      astroData = data;
      // //Step 4. Do something wth the data
      // let astronautsNo = data.number;
      // let astronauts = data.people;

      // //Step 4.1 Show the number on the page
      // //Create a p element to show the number
      // let numberPar = document.createElement("p");
      // numberPar.innerHTML = astronautsNo;

      // //Access section container and append to it
      // let container = document.getElementById('data_container');
      // container.appendChild(numberPar);

      // //add styling
      // numberPar.setAttribute('class', 'astronaut_number');

      // //Step 4.2 Show the names on the page
      // astronauts.forEach(element => {
      //   console.log(element);

      //   let astronaut = element.name;
      //   //for every astronaut create a span element
      //   let astroSpan = document.createElement("span");
      //   astroSpan.innerHTML = astronaut;
      //   //attach to the section container
      //   container.appendChild(astroSpan);
      //   //add styling
      //   astroSpan.setAttribute('class', 'astronaut_name');
      // })
    })
    .catch(function (error) {
      console.log(error);
    });
});

/* p5 code*/
function setup(){
  console.log('Setup is working!');
  let myCanvas = createCanvas(800, 400);
  background(144, 238, 144);
  myCanvas.parent('data_container'); // attach to a container
}


function draw() {
  console.log(astroData);

  //Make sure the data is ready
  if(astroData){
    //show astronaut ellipses on the page
    for(let i=0; i<astroData.number; i++){
      //draw an ellipse
      ellipse(30+ i*35, 150, 30);
    }
  }else{
    console.log('Data is not ready yet!')
  }
}
