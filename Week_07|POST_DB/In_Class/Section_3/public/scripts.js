window.addEventListener('load', function () {

    //Grab the data from the database using fetch() on page load
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            //Add a quote to the page
            let quotes = data.data;
            let randomNum = Math.floor(Math.random() * quotes.length);
            let randomQuote = quotes[randomNum].quote;
            console.log(randomQuote);
            document.getElementById("random-quote").innerText = '"' + randomQuote + '"';
    });

    //Setup event listener on button
    let quoteButton = document.getElementById("quote-button");
    quoteButton.addEventListener('click', function () {
        console.log("A Quote!!!");

        //grab name
        let name = document.getElementById('chirp-name').value;
        console.log(name);

        //grab quote
        let quote = document.getElementById('chirp-content').value;
        console.log(quote);

        //create an object
        let quoteObj = {
            "quote": quote,
            "name": name
        };
        console.log(quoteObj);

        //make the object JSON
        let quoteJSON = JSON.stringify(quoteObj);
        console.log(quoteJSON);

        //send the JSON object to the server
        fetch("/quoteSave", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: quoteJSON
        })
            .then(response => response.json())
            .then(data => {
                console.log("Did this work???");
                console.log(data);
                //Update the page
            });
    });
});