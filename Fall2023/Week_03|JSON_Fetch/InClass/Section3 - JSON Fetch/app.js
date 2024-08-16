console.log("Loading...");

window.addEventListener('load', function(){
    console.log("Loaded!");

    //Use fetch() to get the data into the app and on the page
    /*
    Steps to Fetch the JSON Data
        1. request the data
        2. receive a response
        3. get the json file
        4. get the data
    */

    /*
    //Long version
    fetch("data.json").then(function(response){
        console.log(response);
        let jsonData = response.json();
        console.log(jsonData);
        return jsonData;
    }).then(function(data){
        console.log(data);
    });
    */

    
    fetch("data.json")
        .then(response => response.json())
        .then(function(data){
            console.log(data);
            let royalHouses = data.royal_houses;
            console.log(royalHouses);

            let randomHouseNum = Math.floor(Math.random()*royalHouses.length);
            console.log(randomHouseNum);
            let randomRoyalHouse = royalHouses[randomHouseNum];
            console.log(randomRoyalHouse);

            let gotEl = document.getElementById('royal-house');
            gotEl.innerHTML = randomRoyalHouse;


            //Add all the royal houses to the page
            for (let i = 0; i < royalHouses.length; i++){
                let elt = document.createElement('li');
                elt.innerHTML = royalHouses[i];
                let houseList = document.getElementById('all-houses');
                houseList.append(elt);
            }

    });

    //Notice how this log statment will print BEFORE the log statement on line 31
    console.log("Did the data come back yet?");

    /*
    //Showing how you can fetch data from a url
    fetch("http://api.open-notify.org/astros.json")
        .then(response => response.json())
        .then(function(data){
            console.log(data);
    });
    */
})


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


