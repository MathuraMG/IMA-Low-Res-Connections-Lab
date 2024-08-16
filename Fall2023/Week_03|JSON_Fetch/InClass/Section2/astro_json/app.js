console.log("Page is loading");

//Step 1. Make sure the page has loaded
window.addEventListener('load', () => {
  console.log("Page has loaded");

  //Step 2. Send a request for data
  fetch("http://api.open-notify.org/astros.json")
    .then(function (response) { //Receive a response object that includes information about the data (status of the request)
      // console.log(response);
      return response.json(); //return json inside the response object
    })
    .then(function (data) { //Step 3. Access the data
      // console.log(data);
      //Step 4. Do something wth the data
      let astronautsNo = data.number;
      let astronauts = data.people;

      // console.log(astronautsNo);
      // console.log(astronauts);

      //Step 4.1 Show the number on the page
      //Create a p element to show the number
      let numberPar = document.createElement("p");
      numberPar.innerHTML = astronautsNo;
      // console.log('Will show the names');

      //Access section container and append to it
      let container = document.getElementById('data_container');
      container.appendChild(numberPar);

      //add styling
      numberPar.setAttribute('class', 'astronaut_number');
      // console.log(astronauts);
      //Step 4.2 Show the names on the page
      for (let i = 0; i < astronauts.length; i++) {
        console.log(astronauts[i]);

        let astronaut = astronauts[i].name;
        //for every astronaut create a span element
        let astroSpan = document.createElement("span");
        astroSpan.innerHTML = astronaut;
        //attach to the section container
        container.appendChild(astroSpan);
        //add styling
        astroSpan.setAttribute('class', 'astronaut_name');
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});

/*es6 */
//Step 1. Make sure the page has loaded
window.addEventListener('load', () => {
  console.log("Page has loaded");

  //Step 2. Send a request for data
  fetch("http://api.open-notify.org/astros.json")
    .then(response => { //Receive a response object that includes information about the data (status of the request)
      return response.json(); //return json inside the response object
    })
    .then(data => { //Step 3. Access the data
      //Step 4. Do something wth the data
      let astronautsNo = data.number;
      let astronauts = data.people;

      //Step 4.1 Show the number on the page
      //Create a p element to show the number
      let numberPar = document.createElement("p");
      numberPar.innerHTML = astronautsNo;

      //Access section container and append to it
      let container = document.getElementById('data_container');
      container.appendChild(numberPar);

      //add styling
      numberPar.setAttribute('class', 'astronaut_number');
      //Step 4.2 Show the names on the page
      astronauts.forEach(element => {
        console.log(element);

        let astronaut = element.name;
        //for every astronaut create a span element
        let astroSpan = document.createElement("span");
        astroSpan.innerHTML = astronaut;
        //attach to the section container
        container.appendChild(astroSpan);
        //add styling
        astroSpan.setAttribute('class', 'astronaut_name');
      })
    })
    .catch(function (error) {
      console.log(error);
    });
});
