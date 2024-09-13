
// 1. define a list of names
let names = ["Jackie", "Shimmy", "Lu", "Eddie", "Jose", "Zani", "Wendi", "Jesse", "Rachel", "Bella", "Rain", "Tiffany", "Nina"]


// 2. get a reference to the button
let pickButton = document.getElementById("r_button");
console.log(pickButton)
// let container = document.querySelector(".container")


// 3. add an event listener (click) to the button

// 1) using named function
// pickButton.addEventListener("click", clickHandler)
// function clickHandler(){
//     console.log("heyyy");
// }

// or 2) using anonymous arrow function
pickButton.addEventListener("click", () => {
    console.log("heyyyy I'm clicked");

    // 4. execute the random name picking logic whenever the click event is triggered
    const noNames = names.length;
    console.log(noNames)

    let randomIndex = Math.floor(Math.random() * noNames);
    console.log(randomIndex)

    let pickedName = names[randomIndex]
    console.log(pickedName)

    // 5. show name on the html
    let pickedNameElement = document.getElementById("picked_name");
    pickedNameElement.innerHTML = pickedName;


    // 6. change style with animation
    pickedNameElement.classList.add("picked_animation");

    setTimeout(() => {
        pickedNameElement.classList.remove("picked_animation")
    }, 3000)

})


// you can also add event listener to the browser window object
window.addEventListener("load", ()=> {
    console.log("page is loaded")
})


