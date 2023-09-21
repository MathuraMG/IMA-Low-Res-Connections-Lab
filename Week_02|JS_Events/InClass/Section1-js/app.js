const batches = ["Avacado", "Banana", "Coconut", "Dragonfruit"];

//ensure the page is loaded and all the HTML is availab;e
window.addEventListener("load", function () { //callback function
  console.log("page loaded");
  //when user clicks button, show random name
  //1 . ID the button
  let randomButton = document.getElementById("random-button");

  //2. listen for click
  randomButton.addEventListener("click", function () {
    console.log("button clicked");

    //3. when clicked, give random number and name
    let index = Math.floor(Math.random() * 4);
    console.log(batches[index]);
    document.getElementById("heading").innerHTML = batches[index];
    
    
    setTimeout(revertToQuestionMark, 4000);
  })

})

function revertToQuestionMark() {
  document.getElementById("heading").innerHTML = "???";
}

