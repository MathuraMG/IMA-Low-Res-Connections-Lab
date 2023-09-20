console.log("Page is loading");

/*es6 */
//Step 1. Make sure the window loads first
window.addEventListener('load', () => {
  console.log("The page has loaded");

  //Step 2. Send a request for data
  fetch("http://api.open-notify.org/astros.json")
    //Step 3. Buzzer = response
    //Receive a response object that includes information about the data (status of the request)
    .then(response => {
      console.log(response);
      return response.json(); // return the json inside the response object
    })//Step 4. Access the data
    .then(data => {
      console.log(data);
      console.log(data.people);

      //Step 5. Do something with the data - add number to the page
      let astronautNo = data.number;
      let astronauts = data.people;

      //Create a p element that will show the number
      let numberPar = document.createElement('p');
      numberPar.innerHTML = astronautNo;

      //Access the div container and append to it
      let containerDiv = document.getElementById('data_container');
      containerDiv.appendChild(numberPar);

      //add styling to number paragraph
      numberPar.setAttribute('class', 'astronaut_number');

      //Step 6. Show the list of names on the page
      astronauts.forEach(element => {
        console.log(element);
        let astronautName = element.name;
        // console.log(astronautName);

        //Replace space in astronaut name w/ %20
        let astroSearch = astronautName.replace(' ', '%20');
        // console.log(astroSearch);

        //API url that we will ping
        let astroUrl = 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + astroSearch;

        //FETCH 2 - getting Wikipedia URLs
        fetch(astroUrl)
          .then(response => response.json())
          .then(data => {
            console.log(data);

            //access url only
            let url = data[3][0];

            //for every astronaut create a link
            let astroLink = document.createElement('a');
            astroLink.innerHTML = astronautName;

            //set attributes
            astroLink.setAttribute('href', url);
            astroLink.setAttribute('target', '_blank');

            //attach to the same div
            containerDiv.appendChild(astroLink);

            //add some styling
            astroLink.setAttribute('class', 'astronaut_name');
          });
      })
    })
    .catch(error => {
      console.log(error);
    });
});
