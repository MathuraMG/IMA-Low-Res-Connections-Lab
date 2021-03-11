window.addEventListener('load',()=> {
    document.getElementById('button-coffee').addEventListener('click', ()=> {
        let noCups = document.getElementById('number-coffee').value;
        console.log(noCups);

        //creating the object 
        let obj = {"number" : noCups};

        //stringify the object
        let jsonData = JSON.stringify(obj);

        //fetch to route noCups
        fetch('/noCups', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(data => {console.log(data)});

        //1. make a fetch request of type POST so that we can send the (noCups) info to the server
    })

    document.getElementById('get-tracker').addEventListener('click', ()=> {
        //get info on ALL the coffees we've had so far
        fetch('/getCups')
        .then(resp=> resp.json())
        .then(data => {
            document.getElementById('coffee-info').innerHTML = '';
            console.log(data.data);
            for(let i=0;i<data.data.length;i++) {
                let string = data.data[i].date + " : " + data.data[i].coffee;
                let elt = document.createElement('p');
                elt.innerHTML = string;
                document.getElementById('coffee-info').appendChild(elt);
            }
        })
    })
})