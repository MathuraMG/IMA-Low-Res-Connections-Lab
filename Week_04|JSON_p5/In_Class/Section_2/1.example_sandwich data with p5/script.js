console.log("Loading!");

let sandwichSelected = false;
let curSandwich;

window.addEventListener('load', () => {
    //use fetch to load the Sandwich JSON data
    fetch('sandwiches.json')
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            let sandwiches = data.sandwiches;

            //Loop through sandwiches array and add each name to the dropdown
            sandwiches.forEach(sandwich => {
                //console.log(sandwich.name);
                let sandwichOption = document.createElement("option");
                sandwichOption.innerHTML = sandwich.name;
                let sandwichDropdown = document.getElementById("sandwich-select");
                sandwichDropdown.appendChild(sandwichOption);
            });

            //Listen for a selection on the dropdown
            let sandwichDropdown = document.getElementById("sandwich-select");
            sandwichDropdown.addEventListener("change", function (evt) {
                sandwichSelected = false;
                // console.log(evt);
                let curSandwichValue = evt.target.value;
                // console.log(curSandwichValue);

                //Loop through the sandwich array and get the description for the current selection
                sandwiches.forEach(sandwich => {
                    // console.log(sandwich);
                    if (sandwich.name == curSandwichValue)  {
                        console.log("WINNER!!!!");
                        curSandwich = sandwich;

                        let descrEl = document.getElementById("sandwich-description"); descrEl.innerHTML = curSandwich.description;
                        sandwichSelected = true;
                    }
                });
            });
        });
});

//----------p5 Code----------
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(255);

    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    textAlign(CENTER);
}

function draw() {
    background(255);
    if (sandwichSelected) {
        fill(255);
        text(curSandwich.name, width / 2, height / 2);
        fill(243, 184, 52);
        ellipse(width / 2, height / 2 + 30, width / 4, 10);
        ellipse(width / 2, height / 2 - 40, width / 4, 10);

    }
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    background(255);
}