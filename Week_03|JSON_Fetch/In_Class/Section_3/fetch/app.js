console.log("page is loading.");

window.addEventListener("load", () => {

    // request data from an API
    fetch("http://api.open-notify.org/astros.json")

    // or from a local json file
    // fetch("myData.json")
        .then(function (response) {

            // get the request's reponse
            console.log(response);
            return response.json();

        })
        .then((data) => {

            // access the data
            console.log(data);

            // do something with the data
            let astroNumber = data.number;
            console.log(astroNumber);

            // add data to the page
            let astronauts = data.people;
            console.log(astronauts);

            // add the number to the page
            let numberPar = document.createElement('p');
            numberPar.innerHTML = astroNumber;

            // append number paragraph to the container
            let containerSection = document.getElementById('data_container');
            containerSection.appendChild(numberPar);

            // add styling to the number
            numberPar.setAttribute('class', 'astronaut_number');

            for (let i = 0; i < astronauts.length; i++) {
                console.log(astronauts[i].name);

                let astronaut = astronauts[i].name;
                let astroSpan = document.createElement('span');
                astroSpan.innerHTML = astronaut;

                // attach it to the same container
                containerSection.appendChild(astroSpan);

                // style the names
                astroSpan.setAttribute('class', 'astronaut_name')
            }
        })

})


