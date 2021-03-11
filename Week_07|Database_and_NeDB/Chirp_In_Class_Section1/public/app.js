window.addEventListener('load', function () {

    //fetch all chirps from server
    fetch('/allchirps')
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })

    document.getElementById('chirp-button').addEventListener('click', function () {
        let name = document.getElementById('chirp-name').value;
        let content = document.getElementById('chirp-content').value;
        let chirpObject = {
            "name": name,
            "content": content
        };

        fetch('/postchirp', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(chirpObject)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                //we find out that the data has successfully been stored
                // @craig - we didn't actually do this
                let newchirp = document.createElement('p')
                newchirp.innerHTML = chirpObject.content;

            })

        console.log(chirpObject);
    })
})