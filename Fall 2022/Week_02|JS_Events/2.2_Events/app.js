let count = 0;
//steps
//1. identify and select the button
let button;
let colourButton;
let bgColours = ["#f3ed12", "#51e132", "#ffde12"];
let choice = 0;

button = document.getElementById('button');

//2. listen to event click on the button
//3. increase the number in the counter
button.addEventListener("click", function() {
    count+=1;
    document.getElementById('counter').innerHTML = count;
});

// button to change background color
colourButton = document.getElementById('button-colour');
colourButton.addEventListener('click', function(){
    document.body.style.background = bgColours[choice];
    choice = (choice+1)%3;
});


//check for scrolling on the window
window.addEventListener('scroll', function(){
    // console.log(window.scrollY);
    document.body.style.background = "hsl(" + window.scrollY%360 + ",50%,50%)";
});


