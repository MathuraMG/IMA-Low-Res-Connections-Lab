console.log("Page is loading");

//1. Make sure that the page loads first
window.addEventListener("load", function(){
  console.log("The page has loaded");

  //2. Send the request for data
  fetch("http://api.open-notify.org/astros.json")
  .then(function(response){ //3. Get a response: a promise we'll get the data when it's ready
    return response.json() // parse data out of the response
  })
  .then(function(data){ //4. Access the data
    console.log(data)
    //5. Do something with the data -- add number to the page
    let astroNo = data.number;
    let astronauts = data.people;

    //Create a p element that will show the number
    let numberPar = document.createElement('p');
    numberPar.innerHTML = astroNo;

    //Append to the container
    let containerSection = document.querySelector('section');
    containerSection.appendChild(numberPar);

    //Add styling to the number
    numberPar.setAttribute('class', 'astronaut_number');

    //Show the list of names
    for (let i = 0; i<astronauts.length; i++){
      console.log(astronauts[i]);
      let astronaut = astronauts[i].name;

      //for every astronaut create an additional span element
      let astroSpan = document.createElement('span');
      astroSpan.innerHTML = astronaut;

      //Attach to the same section
      containerSection.appendChild(astroSpan);

      astroSpan.setAttribute('class', 'astronaut_name');
    }
  })//catch any erros
  .catch(function(error){
    console.log(error);
  })
});

//es6
// window.addEventListener("load", () => {
//   console.log("The page has loaded");

//   //2. Send the request for data
//   fetch("http://api.open-notify.org/astros.json")
//   .then(response => response.json())
//   .then(data => {
//     let astroNo = data.number;
//     let astronauts = data.people;

//     let numberPar = document.createElement('p');
//     numberPar.innerHTML = astroNo;

//     let containerSection = document.querySelector('section');
//     containerSection.appendChild(numberPar);

//     numberPar.setAttribute('class', 'astronaut_number');

//     //Show the list of names
//     for (let i = 0; i<astronauts.length; i++){
//       let astronaut = astronauts[i].name;

//       let astroSpan = document.createElement('span');
//       astroSpan.innerHTML = astronaut;

//       containerSection.appendChild(astroSpan);
//       astroSpan.setAttribute('class', 'astronaut_name');
//     }
//   })
//   .catch(error => {
//     console.log(error);
//   })
// });
