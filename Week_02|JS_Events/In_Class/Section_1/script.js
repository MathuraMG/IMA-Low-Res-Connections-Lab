console.log("File is running");

//Name
let names = ["Adam", "Steven", "Reverie", "Anna", "Zelong", "Liansheng", "Miya", "Yael"];
// console.log(names);

window.addEventListener("load", () => {
  //All JS code goes here
  console.log("Page has loaded");

  //1. Select the HTML element
  let pickButton = document.getElementById("pick_button");

  //2. Listen for the button to be clicked
  pickButton.addEventListener("click", () => {
    console.log("Button got clicked!");

    //3. Pick a random name
    const noNames = names.length;
    let randomIndex = Math.floor(Math.random() * noNames);
    console.log(randomIndex);
    let pickedName = names[randomIndex];
    console.log(pickedName);

    //4. Show name on the html page
    let pickedNameElement = document.getElementById("picked_name");
    pickedNameElement.innerHTML = pickedName;

    //5. Add animation
    pickedNameElement.classList.add("picked_animation");
    setTimeout(() =>{
      pickedNameElement.classList.remove("picked_animation");
    }, 3000);
  });

});

//Syntax
pickButton.addEventListener("click", function() {

})

pickButton.addEventListener("click", () => {

})
