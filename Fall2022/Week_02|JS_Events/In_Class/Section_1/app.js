let countResult = 0;

//waited for the page to load
window.addEventListener("load", function() {
  console.log("hello the page has really loaded!!");
  //access the button object
  let buttonObject = document.getElementById('add-button');
  buttonObject.addEventListener("click", function() {
    countResult += 1; // same as countResult = countResult + 1;
    console.log(countResult);
    document.getElementById("result").innerHTML = countResult;
  })
});

// addEventListener need 2 things
//1. what is the event? = 'load'
//2. what to do once the event happens? - CALLBACK function


/* STEPS
1. set the starting point for the counter = 0
2. Press the button - adds to the counter
  2a. Access the button object
  2b. Tell it what to do on click - counterResult +1
3. number should increase by 1

//adding another button to reduce the count
1. create a button for -, give it an id
2. access the button via the id
3. once button is clicked, countresult - 1
4. Show the result on screen - display to the new number, the numner should decrease
*/