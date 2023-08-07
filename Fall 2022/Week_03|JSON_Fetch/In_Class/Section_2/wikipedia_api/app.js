console.log('The page is loading');

//Step 1. Make sure the page loads first
window.addEventListener('load', () => {
  console.log('The page has loaded');

  //Step 2. Send request for data (FETCH 1)
  fetch("http://api.open-notify.org/astros.json")
    //Step 3. Receive a response object that includes the information about the data (request status) - A PROMISE
    .then(response => {
      //Return the json inside the response object
      return (response.json());
    })
    //Step 4. Access the data
    .then(data => {
      //Step 5. Show astronaut number on the page
      let astronautNo = data.number;
      let astronauts = data.people;

      //Create a paragraph that will show the number
      let numberPar = document.createElement('p');
      numberPar.innerHTML = astronautNo;

      //Append to container div
      let containerDiv = document.querySelector('#data_container');
      containerDiv.appendChild(numberPar);

      //add some styling
      numberPar.setAttribute('class', 'astronaut_number');

      ////Step 6. Show astronaut list on the page
      for (let i = 0; i < astronauts.length; i++) {
        let astronautName = astronauts[i].name;

        /*Links under each astronaut name */
        //Replace space in astronaut name with %20
        let astroSearch = astronautName.replace(" ", "%20");
        let astroUrl = 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + astroSearch;

        //Write another fetch function (FETCH 2)
        fetch(astroUrl)
          .then(response => response.json())
          .then(data => {
            // console.log(data);
            let url = data[3][0];

            //for every astronaut create a link
            let astronautLink = document.createElement('a');
            astronautLink.innerHTML = astronautName;

            //set attributes
            astronautLink.setAttribute('href', `${url}`);
            astronautLink.setAttribute('target', '_blank');

            //attach to the same div
            containerDiv.appendChild(astronautLink);

            //add some styling
            astronautLink.setAttribute('class', 'astronaut_name');
          })
          .catch(error => console.log(error));
      }
    })
    .catch(error => {
      console.log(error);
    });

});
