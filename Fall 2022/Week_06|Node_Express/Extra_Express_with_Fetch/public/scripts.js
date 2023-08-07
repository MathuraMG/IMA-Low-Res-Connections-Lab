window.addEventListener('load', ()=>{

    //Request json file
    fetch("quotes.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let quotes = data.quotes;
        let randomNum = Math.floor(Math.random() * quotes.length);
        let randomQuote = quotes[randomNum];
        document.getElementById("pizza-quote").innerHTML = '"' + randomQuote + '"';
    });

    //Request random pizza
    let pizzaButton = document.getElementById("pizza-button");
    pizzaButton.addEventListener("click", () => {
        console.log("Button clicked!");

        //Request random pizza object
        fetch("/random")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let pizzaString = "How about a " + data.type + " pizza? It only costs $" + data.cost + "!";
            document.getElementById("pizza-random").innerHTML = pizzaString;
        });
    });
});