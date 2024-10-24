console.log("Page is loading");

//1. Make sure that the page loads first
window.addEventListener("load", async () => {
  console.log("The page has loaded");

  try {
    //2. Send the request for data
    const response = await fetch("http://api.open-notify.org/astros.json")
    //3. Access the data once the response is ready
    const data = await response.json()
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
    for (let i = 0; i < astronauts.length; i++) {
      console.log(astronauts[i]);
      let astronaut = astronauts[i].name;

      //for every astronaut create an additional span element
      let astroSpan = document.createElement('span');
      astroSpan.innerHTML = astronaut;

      //Attach to the same section
      containerSection.appendChild(astroSpan);

      astroSpan.setAttribute('class', 'astronaut_name');
    }
  }
  catch (error) {
    console.log(error);
  }
  });
