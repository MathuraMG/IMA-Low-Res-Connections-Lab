console.log("Page is loaded!");

//make sure the page is fully loaded
window.addEventListener('load', function () {

    console.log("Page is fully loaded!");

    //1. request the json data
    //2. wait to receive a response
    //3. get the json file
    //4. get the data

    /*
    fetch("rock.json").then(function(response){
       // console.log(response);
        let jsonData = response.json();
        //console.log(jsonData);
        return jsonData
    }).then(function(data){
        console.log(data);
        //do something with the data
    });
    */

    fetch("rock.json")
        .then(response => response.json())
        .then(rockData => {
            console.log("Rock and Roll Data")
            console.log(rockData);

            let randomNum = Math.floor(Math.random() * rockData.artists.length);
            console.log(randomNum);

            //choose a random artist object
            let randomArtistObj = rockData.artists[randomNum];
            console.log(randomArtistObj);

            let musicianName = randomArtistObj.name;
            let musicianYear = randomArtistObj.year;

            let rockString = musicianName + " was inducted into the Rock N Roll Hall of Fame in " + musicianYear;

            let rockInfoDiv = document.getElementById("rockInfo");
            rockInfoDiv.innerText = rockString;

            //wikipedia info
            let corsAnywhere = "https://cors-anywhere.herokuapp.com/"
            let wikiSearchURL = corsAnywhere + "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + musicianName;
            fetch(wikiSearchURL)
                .then(response => response.json())
                .then(data => {
                    console.log("Wikipedia Data!");
                    console.log(data);
                })
        });

    /*
    fetch("http://api.open-notify.org/astros.json")
    .then(response => response.json())
    .then(data => {
        console.log("Astronaut Data");
        console.log(data);
    });
    */
});

console.log("Is the page fully loaded???");