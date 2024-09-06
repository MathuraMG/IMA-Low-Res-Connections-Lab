let names = ["Doc", "Sleepy", "Dopey", "Grumpy", "Happy", "Bashful", "Sneezy"];

//wait for the page to load
window.addEventListener("load", () => {
  console.log("page loaded");
  //assign the button to a variable
  let pickButton = document.getElementById("pick-name-button");
  //add an event listener to the button
  pickButton.addEventListener("click", () => {
    console.log("button clicked");

    //Select a random name from the "names" array
    const noNames = names.length;
    let randomNumber = Math.floor(Math.random()*noNames);
    let pickedName = names[randomNumber];
    console.log(pickedName);
    //move the picked name into the HTML <p> tag
    let pickedNameElement = document.getElementById("picked-name");
    pickedNameElement.innerHTML = pickedName;

    
  })
})
