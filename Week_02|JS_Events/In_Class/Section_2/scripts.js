let a = "hello";
console.log(a);

//definte an array with all the cohort names as strings
let cohortNames = ["Avocados", "Bananas", "C-Foods", "Dragonfruit", "Edamames", "Fungi", "Guavas"];
console.log(cohortNames);

//logic to update the page with a new cohort name
function updateName() {
    let randomNum = Math.floor(Math.random() * cohortNames.length);
    console.log(randomNum);

    let randomName = cohortNames[randomNum];
    console.log(randomName);

    let nameEl = document.getElementById("cohort-name");
    console.log(nameEl);

    nameEl.innerText = randomName;
}

//update the name on page load
updateName();

//select for the button
let nameButton = document.getElementById("name-button");
console.log(nameButton);

//listen for a button click,, update the name when the click happens
nameButton.addEventListener("click", () => { 
    console.log("Button was pressed!!!!!");
    updateName();
    console.log("done");
});
