console.log("Loading!");
let a = "Hello!";

//1. On page load, display a cohort name
//2. When the button is pressed, show another name

//Define the data set
let names = ["Avocados", "Bananas", "C-Foods", "Dragonfruit", "Edamame"];

//Select for the button
let theButton = document.getElementById('new-name-button');
console.log(theButton);

//Define the function to be called 'inside' the callback after the click occurs
function updateName() {
    //Get a random name
    let nameNum = Math.floor(Math.random() * names.length);
    console.log(nameNum);
    let cohortName = names[nameNum];
    console.log(cohortName);

    //Select for the element on the page
    let nameEl = document.getElementById('cohort-name');
    console.log(nameEl);
    //Update the element on the page
    nameEl.innerHTML = cohortName;
}

//Attach an event listener to the button
theButton.addEventListener('click', () => {
    console.log("The button was clicked!");
    updateName();
});

//Call this function when the js file loads
updateName();

// function doSomething(){
//     console.log("The button was clicked!");
// }

// theButton.addEventListener('click',doSomething);

// theButton.addEventListener('click', function(){
//     console.log("The button was clicked!");   
// });
