// let a = "hello class";
// alert(a);
console.log("Page is loaded!");

let currentNum = 0;

//1. select for the button element
//2. listen for when the button is clicked
//3. do something when the button is clicked

let theButton = document.getElementById("the-button");
console.log(theButton);

let doSomething = function(){
    console.log("Button was pressed!");
}

// theButton.addEventListener('click', doSomething );

theButton.addEventListener('click', function(){
    console.log("Button was pressed!");
    let theNumber = document.getElementById('the-number');
    console.log(theNumber);
    currentNum = currentNum + 1;
    theNumber.innerHTML = currentNum;
});