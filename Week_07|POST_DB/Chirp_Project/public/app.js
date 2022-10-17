window.addEventListener('load', function(){

    //Fetch all chirps from server
    fetch('/allchirps')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        let chirpData = data.data;

        //sort the chirpData by timestamp
        chirpData.sort(function(a, b){
            return b.timestamp-a.timestamp
        })
        console.log(chirpData);

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
            //check if was saved
            if (data.task == "success"){
                let curChirp = data.chirp;
                console.log(curChirp);
                //add data to the page 
                
                // Get the parent element
                let parentElement = document.getElementById('feed');
                // Get the parent's first child
                let theFirstChild = parentElement.firstChild
                // Create a new element
                let newChirp = document.createElement('p');
                let chirpContent = curChirp.name + " : " + curChirp.msg;
                newChirp.innerHTML = chirpContent;
                // Insert the new element before the first child
                parentElement.insertBefore(newChirp, theFirstChild);
            }
        })
    });
});