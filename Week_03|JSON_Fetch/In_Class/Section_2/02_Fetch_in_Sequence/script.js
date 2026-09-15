console.log("Page is loading");

//Make sure that the page loads first
window.addEventListener("load", () => {
  console.log("The page has loaded");

  //send the request for data
  fetch("http://api.open-notify.org/astros.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data)

      //do something with the data -- add number to the page
      let astroNo = data.number;
      let astronauts = data.people;

      //create a p element that will show the number
      let numberPar = document.createElement('p');
      numberPar.innerHTML = astroNo;

      //append to the container
      let containerSection = document.querySelector('section');
      containerSection.appendChild(numberPar);

      //add styling to the number
      numberPar.setAttribute('class', 'astronaut_number');

      //show the list of names
      // use forEach to iterate through the array
      // make a fetch() request for every name
      astronauts.forEach(astronaut => {
        console.log(astronaut);
        let name = astronaut.name;

        //replace the space in the name
        let astroSearch = name.replace(" ", "%20");

        //fetch wikipedia url - uses cors-anywhere
        let astroUrl = 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + astroSearch;

        fetch(astroUrl)
          .then(response => response.json())
          .then(data => {
            console.log(data);

            //access the url only
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
    })//catch any errors
    .catch((error) => {
      console.log(error);
    });
});