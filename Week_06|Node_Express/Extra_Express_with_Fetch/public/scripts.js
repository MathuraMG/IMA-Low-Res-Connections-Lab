window.addEventListener('load', () => {

    //Request json file
    fetch("quotes.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        //Show a random quote on the page
        let quotes = data.quotes;
        let randomNum = Math.floor(Math.random() * quotes.length);
        let randomQuote = quotes[randomNum];
        document.querySelector("#pizza-quote").innerHTML = '"' + randomQuote + '"';
    });

    //Request random pizza
    let pizzaButton = document.querySelector("#pizza-button");
    pizzaButton.addEventListener("click", () => {
        console.log("Button clicked!");

        //Request random pizza object
        fetch("/random")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let pizzaString = "How about a " + data.type + " pizza? It only costs $" + data.cost + "!";
            document.querySelector("#pizza-random").innerHTML = pizzaString;
        });
    });
});
