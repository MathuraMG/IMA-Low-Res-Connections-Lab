//declare and initialize our list just like any other variable
var catList = [
  "cat1",
  "cat2",
  "cat3",
  "cat4",
  "cat5"
];

//declare and initialize our counter
var counter = 0;

//this is the function that swaps out photos
function rotate() {
  //display the photo in the index currently called by the counter
  document.getElementById("catPhoto").src =
    "images/" + catList[counter] + ".jpg";

  //if the counter is greater than the number of things in the array, reset to 0, otherwise add 1
  if (counter >= catList.length - 1) {
    counter = 0;
  } else {
    counter = counter + 1;
  }
}

//select for the button element
let button = document.getElementById('button');
//attach the event listener
button.addEventListener('click', rotate);
