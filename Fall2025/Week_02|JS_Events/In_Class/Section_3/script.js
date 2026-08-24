console.log("js file loaded")

let names = [
    "Alex",
    "Chrissy",
    "Jane",
    "Caroline",
    "Helena",
    "Alaine",
    "Dae",
    "Jeremy",
    "Cecilia",
    "Chioma",
    "Roger",
    "Levi",
    "Queenie",
    "Nate"
]

// get a reference to the button
let pickButton = document.getElementById("r_button");
console.log(pickButton)

// add an event listener (click) to the button
// pickButton.addEventListener('click', clickHandler)

// function clickHandler(){
//     console.log('button is clicked')

//     // get access to the names array
//     const noNames = names.length;
//     console.log(noNames);

//     let randomIndex = Math.floor(Math.random() * noNames);
//     console.log(randomIndex);

//     // show random name on the html
//     let pickedNameElement = document.getElementById("picked_name");
//     pickedNameElement.innerHTML = names[randomIndex];
// }

// OR use anonymous arrow functions
pickButton.addEventListener('click', ()=>{
    console.log('button is clicked')

    // get access to the names array
    const noNames = names.length;
    console.log(noNames);

    let randomIndex = Math.floor(Math.random() * noNames);
    console.log(randomIndex);

    // show random name on the html
    let pickedNameElement = document.getElementById("picked_name");
    pickedNameElement.innerHTML = names[randomIndex];

    // add some animations to the picked name
    pickedNameElement.classList.add('picked_animation');

    setTimeout(() => {
        pickedNameElement.classList.remove("picked_animation")
    }, 3000)
})

// you can also add event listener to the browser window object
window.addEventListener("load", ()=> {
    console.log("page is loaded")
})

