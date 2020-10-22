window.addEventListener('load', function(){

    //Fetch all chirps from server
    fetch('/allchirps')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        let chirpData = data.data;

        let parent = document.getElementById('feed');
        //Loop through the data & append info to the page
        for (let i=0; i < chirpData.length; i++){
            let newChirp = document.createElement('p');
            let chirpContent = chirpData[i].name + " : " + chirpData[i].msg;
            console.log(chirpContent);
            newChirp.innerHTML = chirpContent;
            feed.appendChild(newChirp);
        }
    });

    //Setup event listener on button
    let chirpButton = document.getElementById("chirp-button");
    chirpButton.addEventListener('click', function(){
        console.log("Chirp!!!");

        //Grab the input box values
        let name = document.getElementById('chirp-name').value;   
        let msg = document.getElementById('chirp-content').value;

        //Create a js object
        let chirpObject = {
            "name": name,
            "msg" : msg
        };
        console.log(chirpObject);
        //Convert the js object into JSON
        let chirpObjectJSON = JSON.stringify(chirpObject);
        console.log(chirpObjectJSON);

        //Send the data to the server
        fetch('/chirpData', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: chirpObjectJSON
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            //show data on the page
        })
    });
});