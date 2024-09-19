console.log("page is loading.")

window.addEventListener("load", () => {
    console.log("page is loaded.")

    // 1. request data
    fetch("http://api.open-notify.org/astros.json")
        .then(function (response) {  // using function (xxx) {...} syntax
            // console.log(response); // 2. get the status of the request (a response object that includes information about the data)
            return response.json();
        })
        .then((data) => {  // using arrow function syntax: (xxx) => {...}
            // console.log(data); // 3. access the data

            // 4. get a local reference to the number and people
            let astroNumber = data.number // data["number"]
            let astronauts = data.people

            console.log(astroNumber)
            console.log(astronauts)

            // 5. add them to the page
            // add the number to the page
            let numberPar = document.createElement('p');
            numberPar.innerHTML = astroNumber;

            // append number paragraph to the container
            let containerSection = document.getElementById('data_container');
            containerSection.appendChild(numberPar);

            // add styling to the number
            numberPar.setAttribute('class', 'astronaut_number')

            for(let i=0; i<astronauts.length; i++){
                console.log(astronauts[i])
                let astronaut = astronauts[i].name;

                // create a span element for each astronaut
                let astroSpan = document.createElement('span');
                astroSpan.innerHTML = astronaut;

                // attache to the same container
                containerSection.appendChild(astroSpan);

                // style the span
                astroSpan.setAttribute('class', 'astronaut_name');
            }

        })
        .catch(function (error){
            console.log(error);
        })
})