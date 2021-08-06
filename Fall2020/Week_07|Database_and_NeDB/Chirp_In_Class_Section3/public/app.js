window.addEventListener('load',function(){
    console.log("Yes!");

    //Add here code to fetch all chirps on page load


    //Adding button event listener
    let button = document.getElementById('chirpButton');
    button.addEventListener('click', function(){
        console.log("Chirp button was presssed!");

        //Grab input values
        let name = document.getElementById('chirp-name').value;
        let content = document.getElementById('chirp-content').value;

        //Create Chirp Object
        let chirpObj = {
            "name" : name,
            "content" : content
        };
        console.log(chirpObj);
        
        let chirpObjJSON = JSON.stringify(chirpObj);
        console.log(chirpObjJSON);

        //Send JSON to the server
        fetch('/chirpData',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: chirpObjJSON
        })
        .then(res => res.json())
        .then(data => {
            console.log("Hooray!");
            console.log(data);
        })
    });
});






