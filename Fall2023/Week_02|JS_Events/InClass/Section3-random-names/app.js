console.log("Loading...");

const cohortNames = ["Avocados", "Bananas", "C-Foods", "Dragonfruit"];

// function doSomething(){
//     console.log("Done loading!!!");
// }

window.addEventListener("load", function () {

  //code to run when after page has loaded
  console.log("Done loading!!!");

  //select for the button
  let theButton = document.getElementById("name-button");
  console.log(theButton);

  //add "click" event listener to the button
  theButton.addEventListener("click", function () {
    console.log("Clicked the button!!!");

    //generate random number
    let randomNum = Math.floor(Math.random() * cohortNames.length)
    console.log(randomNum);

    //grab a random name 
    let randomName = cohortNames[randomNum];
    console.log(randomName);

    //add it to the page
    let pageEl = document.getElementById("random-name-page");
    pageEl.innerHTML = randomName;
  });
});

console.log("Still loading???");