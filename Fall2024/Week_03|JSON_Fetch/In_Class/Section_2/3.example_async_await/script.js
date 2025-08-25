console.log("Page is loading");

//1. The 'await' function only works inside an 'async' function
window.addEventListener("load", async () => {
    console.log("The page has loaded");

    // 2. Use try / catch
    try {
        //3. Send the request for data
        const response = await fetch("http://api.open-notify.org/astros.json")
        
        //4. Access the data once the response is ready
        const data = await response.json()

        //5. Do something with the data -- add number to the page
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
    }
    catch(error) {
        console.log(error);
    }
});