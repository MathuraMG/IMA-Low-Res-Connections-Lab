console.log("Client!!!");

window.addEventListener('load', function(){

    //get all of the data from the server
    fetch('/data')
    .then(response => response.json())
    .then(data => {
        console.log(data);

        //Add data to page
        let container = document.getElementById('container');
        for (let i = 0; i < data.chirps.length; i++){
            let currentName = data.chirps[i].name;
            let currentChirp = data.chirps[i].chirp;

            let currentEl = document.createElement('p');
            currentEl.innerHTML = currentName + ":" + currentChirp;
            container.appendChild(currentEl);
        }
    });

    //Create event listener to collect and POST data
    let chirpButton = document.getElementById('chirp-button');
    chirpButton.addEventListener('click', function(){
        console.log("Button was clicked!");
     
        let currentName = document.getElementById('chirp-name').value;
        let currentChirp = document.getElementById('chirp-content').value;

        let chirpObj = {
            name: currentName,
            chirp: currentChirp
        };
        console.log(chirpObj);

        let chirpJSONObj = JSON.stringify(chirpObj);
        console.log(chirpJSONObj);

        fetch('/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: chirpJSONObj
        })
        .then(response => response.json())
        .then(data => {
            console.log("Did this work?");
            console.log(data);

            //Update the page with the current chirp
            let container = document.getElementById('container');
            let currentEl = document.createElement('p');
            currentEl.innerHTML = chirpObj.name + ":" + chirpObj.chirp;
            container.appendChild(currentEl);
        });
    });
});