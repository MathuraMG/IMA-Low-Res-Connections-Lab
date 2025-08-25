console.log("Page is loading");

//1. Make sure the page loads first
window.addEventListener('load', function () {
  console.log("Page has loaded");

  //2. Request data
  fetch("http://api.open-notify.org/astros.json")
  .then(function(response){ //3. Then get the status of the request
    // console.log(response);
    return response.json()
  })
  .then(function(data){ //4. Then access the data
    // console.log(data);
    //5. Do something with the data
    astroData = data;
    // let astroNumber = data.number;
    // let astronauts = data.people;
    // // console.log(astroNumber)
    // // console.log(astronauts)

    // //Add the number to the page
    // let numberPar = document.createElement('p');
    // numberPar.innerHTML = astroNumber;

    // //Append number par to html
    // let containerSection = document.querySelector('section');
    // containerSection.appendChild(numberPar);

    // //Add styling to the number
    // numberPar.setAttribute('class', 'astronaut_number');

    // //Add the astronaut names
    // for(let i=0; i<astronauts.length; i++){
    //   console.log(astronauts[i]);
    //   let astronaut = astronauts[i].name;

    //   //create a new span element for each astronaut
    //   let astroSpan = document.createElement('span');
    //   astroSpan.innerHTML = astronaut;

    //   //attach to the same container
    //   containerSection.appendChild(astroSpan);

    //   astroSpan.setAttribute('class', 'astronaut_name');
    // }
  })
  .catch(function(error){
    console.log(error);
  });
});

/*P5 CODE */

let astroData;

function setup(){
  console.log("Setup is working!");
  let myCanvas = createCanvas(800, 400);
  background(253, 144, 253);

  //Attach to the container
  myCanvas.parent('data_container');
}

function draw(){
  // console.log(astroData);
  if(astroData){
    for(let i=0; i<astroData.number; i++){
      ellipse(30+i*35, 150, 30)
    }
  }else{
    console.log("Data is not ready yet!")
  }
  // debugger;
  // console.log(astroData.number);
}

