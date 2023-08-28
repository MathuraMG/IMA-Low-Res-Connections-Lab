console.log('The page is loading');

//Step 1. Make sure the page loads first
window.addEventListener('load', () => {
  console.log('The page has loaded');

  //Step 2. Send request for data
  fetch("http://api.open-notify.org/astros.json")
  //Step 3. Receive a response object that includes the information about the data (request status) - A PROMISE
  .then(response => {
    // console.log(response);
    //Return the json inside the response object
    return (response.json());
  })
  //Step 4. Access the data
  .then(data => {
    // console.log(data);
    // console.log(data.people);

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
    for (let i=0; i<astronauts.length; i++){
      let astronautName = astronauts[i].name;

      /*
      //Simple list
      let astronautSpan = document.createElement('span');
      astronautSpan.innerHTML = astronautName;
      containerDiv.appendChild(astronautSpan);
      */

      /*Links under each astronaut name */
      //Replace space in astronaut name with _
      let astroSearch = astronautName.replace(" ", "_");
      let astroUrl = 'https://en.wikipedia.org/wiki/' + astroSearch;

      //for every astronaut create a link
      let astronautLink = document.createElement('a');
      astronautLink.innerHTML = astronautName;

      //set attributes
      astronautLink.setAttribute('href', `${astroUrl}`);
      astronautLink.setAttribute('target', '_blank');
      // console.log(astronautLink);

      //attach to the same div
      containerDiv.appendChild(astronautLink);


      //add some styling
      astronautLink.setAttribute('class', 'astronaut_name');
    }
  })
  .catch(error => {
    console.log(error);
  });

});
