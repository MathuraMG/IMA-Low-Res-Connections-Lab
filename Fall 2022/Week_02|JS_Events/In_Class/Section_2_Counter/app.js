// Here we're checking to make sure that the file is properly connected
console.log('hello world');

//Global variables
let counter=0;

//Step 1. Select a button
let counterButton = document.getElementById('counterButton');
//Step 2. Listen for a button - es5 version
counterButton.addEventListener('click', function(){
  //Step 3. Increase the counter (change the 0 number)
  console.log('button works!');
  counter++;

  //find a 0 paragraph & update value
  document.getElementById('counter').innerHTML = counter;
});

//Step 2. Listen for a button - es6 version
/*
counterButton.addEventListener('click', () => {
  counter++;
  document.getElementById('counter').innerHTML = counter;
});
*/

//Steps2-3 with the callback function outside the addEventListener
/*
counterButton.addEventListener('click', counterFunction);

function counterFunction (){
  counter++;
  document.getElementById('counter').innerHTML = counter;
}
*/
