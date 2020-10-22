window.addEventListener('load', function() {

    //get all the chirps and add it in my HTML
    fetch('/allchirps')
    .then(resp=>resp.json())
    .then(data=>{ 
        console.log(data);
    })

    let button = document.getElementById('button-chirp');
    //ON BUTTON CLICK | getting information about the chirp form theinput boxes
    button.addEventListener('click', function() {
        let name = document.getElementById('chirp-name').value;
        let content = document.getElementById('chirp-content').value;
        let chirpObj = {
            "name" : name,
            "content": content
        }
        console.log(chirpObj);
        fetch('/postchirp', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(chirpObj)
        })
        .then(resp=>resp.json())
        .then(data=>{ 
            console.log(data);
        })
    })
})