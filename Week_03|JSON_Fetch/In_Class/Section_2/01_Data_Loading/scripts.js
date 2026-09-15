console.log("1 - Loading!");

//Wait for the entire page to load before making the fetch requests
window.addEventListener('load', () => {

    console.log("The page is ready!");

    //Fetch sandwich data
    /*
    //LONG VERSION
    fetch('sandwiches.json').then(function (response) {
        console.log(response);
        let jsonData = response.json();
        return jsonData
    }).then(function (data) {
        console.log(data);
    });
    */

    //SHORT VERSION
    fetch('sandwiches.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            let sandwichNames = data.sandwiches;
            console.log(sandwichNames);

            let randomNum = Math.floor(Math.random() * sandwichNames.length);
            let randomSandwichName = sandwichNames[randomNum].name;
            console.log(randomSandwichName);

            //add the name to the page
            let nameEl = document.querySelector('#data-container-1');
            nameEl.innerText = randomSandwichName;
        });

    //Fetch astronaut data
    fetch('http://api.open-notify.org/astros.json')
        .then(response => response.json())
        .then(data => {
            console.log("2 - We have the data!!!");
            //console.log(data);

            //add the data to the page
            let astroNumber = data.number;
            //console.log(astroNumber);

            let numEl = document.querySelector('#data-container-2');
            numEl.innerText = astroNumber;
        });

});

console.log("3 - End of javascript file");

/*
//ES6 Arrow Syntax for anonymous functions

function(a){
 let b = a + 10;
 return b;
}

function(a){
    return a + 10;
}

(a) => {
    return a + 10;
}
   
// a => return a + 10

a => a + 10
*/