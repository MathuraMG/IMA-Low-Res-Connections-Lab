console.log("Page is loading");

//The 'await' function only works inside an 'async' function
window.addEventListener("load", async () => {

    //send the request for data using 'await'
    const response = await fetch("http://api.open-notify.org/astros.json");
    //access the data once the response is ready using 'await'
    const data = await response.json();
    console.log(data);

    let astroNumber = data.number;
    let astronauts = data.people;

    //add the number to the page
    let numberPar = document.createElement('p');
    numberPar.innerHTML = astroNumber;
    //add styling to the number
    numberPar.setAttribute('class', 'astronaut_number');

    //append number par to html
    let containerSection = document.querySelector('section');
    containerSection.appendChild(numberPar);

    //add the astronaut names to the page
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
});