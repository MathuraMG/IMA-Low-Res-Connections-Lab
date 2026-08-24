//Declare and initialize our list just like any other variable
let helloList = [
  "Hello",
  "Namaste",
  "Aloha",
  "Hola",
  "Bonjour",
  "Hej",
  "Ahoj",
  "Xin chao",
  "Jambo",
  "Zdravstvuyte",
  "Ni hao",
  "Labas"
];

//Declare and initialize a counter
let counter = 0;

//This is the function that swaps out text
function rotate() {
  //Display the text in the index currently called by the counter
  document.getElementById("helloText").innerHTML = helloList[counter];

  //If the counter is greater than the number of items in the array, reset to 0, otherwise add 1
  if (counter >= helloList.length - 1) {
    counter = 0;
  } else {
    counter = counter + 1;
  }
}

//Select for the button
let button = document.getElementById('button');
//Add the click event listener with a callback function
button.addEventListener('click', rotate);
