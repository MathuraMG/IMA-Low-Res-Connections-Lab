console.log("Top of page");

window.addEventListener('load', () => {

    console.log("Window is loaded!");

    /*
    1. Load json data from a static local file
        - use long fetch syntax
        - use short fetch syntax
    2. Load json data from a url
    */

    /*
    //Load data via static file - long fetch syntax
    fetch('sandwiches.json').then(function (response) {
        console.log(response);
        let jsonData = response.json();
        return jsonData
    }).then(function (data) {
        console.log(data);
        sandwichData = data
    });
    */

    //Load data via static file - short fetch syntax
    fetch('sandwiches.json')
        .then(response => response.json())
        .then(myData => {
            console.log("Sandwich data is loaded!");
            console.log(myData);

            //do work
            let sandwiches = myData.sandwiches;
            console.log(sandwiches);

            // let firstSandwich = sandwiches[0].name;
            // console.log(firstSandwich);

            let sandwichNum = Math.floor(Math.random() * sandwiches.length);
            console.log(sandwichNum);

            let sandwichName = sandwiches[sandwichNum].name;
            console.log(sandwichName);

            let dataContainer = document.getElementById('data-container');
            dataContainer.innerText = sandwichName;
        });

    console.log("Sandwich data is loaded?");

    //Load data via url
    let astrosURL = 'http://api.open-notify.org/astros.json';
    fetch(astrosURL)
        .then(response => response.json())
        .then(astroData => {
            console.log(astroData);

            //add astro number to page
            let dataContainerAstro = document.getElementById('data-container-astros');
            dataContainerAstro.innerText = astroData.number;
        });
});

console.log("Bottom of page");

/*
//ES6 Arrow Function Syntax
function(a){
    let b = a + 10;
    return b
};

function(a){
    return a + 10;
}

(a) => {
    return a + 10;
}

a => return a + 10;

a => a + 10
*/