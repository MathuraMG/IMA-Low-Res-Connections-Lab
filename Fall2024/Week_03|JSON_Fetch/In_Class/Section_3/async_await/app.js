console.log("Page is loading.");

window.addEventListener("load", async () => {
  console.log("page is loaded.")

  // 1. request data
  try {
    const response = await fetch("http://api.open-notify.org/astros.json"); // await the fetch call
    // console.log(response); // 2. get the status of the request (a response object that includes information about the data)
    const data = await response.json(); // await the response to JSON conversion

    // 3. access the data
    // console.log(data); 

    // 4. get a local reference to the number and people
    let astroNumber = data.number; // data["number"]
    let astronauts = data.people;

    console.log(astroNumber);
    console.log(astronauts);

    // 5. add them to the page
    // add the number to the page
    let numberPar = document.createElement('p');
    numberPar.innerHTML = astroNumber;

    // append number paragraph to the container
    let containerSection = document.getElementById('data_container');
    containerSection.appendChild(numberPar);

    // add styling to the number
    numberPar.setAttribute('class', 'astronaut_number');

    for (let i = 0; i < astronauts.length; i++) {
      console.log(astronauts[i]);
      let astronaut = astronauts[i].name;

      // create a span element for each astronaut
      let astroSpan = document.createElement('span');
      astroSpan.innerHTML = astronaut;

      // attach to the same container
      containerSection.appendChild(astroSpan);

      // style the span
      astroSpan.setAttribute('class', 'astronaut_name');
    }
  } catch (error) {
    console.log(error); // handle any errors
  }
});


