console.log("Page is loading");

//1. Make sure that the page loads first
window.addEventListener("load", () => {
  console.log("The page has loaded");

  //2. Send the request for data
  fetch("http://api.open-notify.org/astros.json")
    //3. Then get the status of the request: a promise we'll get the data when it's ready
    .then((response) => {
      // console.log(response);
      // console.log(response.json())
      return response.json() // parse to make it readable
    })
    //4. Access the data
    .then((data) => {
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
      astronauts.forEach(astronaut => {
        console.log(astronaut);
        let name = astronaut.name;

        //Replace the space in the name
        let astroSearch = name.replace(" ", "%20");

        //Fetch wikipedia url
        // let astroUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + astroSearch;
        let astroUrl = 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + astroSearch;

        fetch(astroUrl)
          .then(response => response.json())
          .then(data => {
            console.log(data);

            //access url only
            let url = data[3][0]

            //for every atsronaut create a link
            let astroLink = document.createElement('a');
            astroLink.innerHTML = name;

            //Set attributes
            astroLink.setAttribute('href', url);
            astroLink.setAttribute('target', '_blank');

            //Attach to the same section
            containerSection.appendChild(astroLink);

            astroLink.setAttribute('class', 'astronaut_name');
          })
      })
    })//catch any erros
    .catch((error) => {
      console.log(error);
    });
});
