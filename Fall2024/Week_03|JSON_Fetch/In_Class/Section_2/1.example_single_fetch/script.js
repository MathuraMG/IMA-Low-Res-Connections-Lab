console.log("Loading!");

window.addEventListener('load', () => {
    console.log("Page is loaded!");

    //use fetch to load the Sandwich JSON data
    /*
    //Uses ES5 syntax - anonymous function for callback
    fetch('sandwiches.json')
        .then(function(response){

            console.log("The Response");
            console.log(response);
            let jsonData = response.json();
            console.log("The JSON Data");
            console.log(jsonData);
            return jsonData
        
            }).then(function(data){

            console.log("The JS Object");
            console.log(data);

        });
    */

    /*
    //Uses ES6 - arrow for callback
    fetch('sandwiches.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let firstSandwich = data.sandwiches[0].name;
            console.log(firstSandwich);
        });
    */

    //Make a fetch request to the astronaut API
    //Add the data to the page
    fetch('http://api.open-notify.org/astros.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // console.log(astroNumber)
            let astroNumber = data.number;
            // console.log(astronauts)
            let astronauts = data.people;

            //Add the number to the page
            let numberPar = document.createElement('p');
            numberPar.innerHTML = astroNumber;

            //Append number par to html
            let containerSection = document.querySelector('section');
            console.log(containerSection);
            containerSection.appendChild(numberPar);

            //Add styling to the number
            numberPar.setAttribute('class', 'astronaut_number');

            //Add the astronaut names
            for (let i = 0; i < astronauts.length; i++) {
                console.log(astronauts[i]);
                let astronaut = astronauts[i].name;

                //create a new span element for each astronaut
                let astroSpan = document.createElement('span');
                astroSpan.innerHTML = astronaut;

                //attach to the same container
                containerSection.appendChild(astroSpan);
                astroSpan.setAttribute('class', 'astronaut_name');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
});

console.log("Are we loaded yet???");