let a = "Hello";
let b = " Class!";
let c = a + b;
//alert(c);

//GOAL - Be able to click on the button and show a cohort name

//STEPS
//1. When the page loads, show a cohort name
//2. Click button to update the cohort name

//Create an array with the cohort names
let cohortNames = ['Avocados', 'Bananas', 'C-Foods', 'Dragonfruit', 'Edamame', 'Fungi'];

//Code to update the name on the page
function updateName() {
    //generate a random number to pick from the array
    let randomNameNum = Math.floor(Math.random() * cohortNames.length);
    console.log(randomNameNum);
    //select for a name based on the random number generated
    let randomName = cohortNames[randomNameNum];
    console.log(randomName);

    //select for the name element on the page
    let nameEl = document.getElementById("random-name");
    console.log(nameEl);
    //update the text of the name element
    nameEl.innerHTML = randomName;
}

//Call the function to update the name on the page
updateName();

//Select for the the button on the page
let theButton = document.getElementById("the-button");
console.log(theButton);
//Listen for a button 'click'
theButton.addEventListener('click', () => {
    console.log("Button was clicked!!!");
    //update the name on the page
    updateName();
});