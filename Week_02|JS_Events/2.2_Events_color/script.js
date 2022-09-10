let r = 0;
let g = 0;
let b = 0;

function addMoreRed() {
    if (r < 255){
        r = r + 5;
        changeBgColor();
    }
}

function addMoreGreen() {
    if (g < 255){
        g = g + 5;
        changeBgColor();
    }
}

function addMoreBlue() {
    if (b < 255){
        b = b + 5;
        changeBgColor();
    }

}

let myBox = document.getElementById('box');

function changeBgColor() {
    myBox.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    currentRGB = "RGB: " + r + "," + g + "," + b;
    let colorText = document.getElementById("color-text");
    colorText.innerHTML = currentRGB;
}

let buttonRed = document.getElementById('button-red');
let buttonGreen = document.getElementById('button-green');
let buttonBlue = document.getElementById('button-blue');

buttonRed.addEventListener('click', addMoreRed);
buttonGreen.addEventListener('click', addMoreGreen);
buttonBlue.addEventListener('click', addMoreBlue);