console.log("js file loaded")

let names = [
    "Cass",
    "Rachel",
    "Tania",
    "Hannah",
    "Lisa",
    "Jojo",
    "Emily",
    "James",
    "Carol",
    "Brandon",
    "Dara",
    "Janice",
    "Taixi",
    "Yien",
    "Yifei"
]


// get a reference to the button
let pickButton = document.getElementById("r_button")
console.log(pickButton)

pickButton.addEventListener('click', ()=>{
    console.log("button is clicked")

    // get access to the names array
    const noNames = names.length;
    console.log(noNames)

    // use Math to get a random name
    let randomIndex = Math.floor(Math.random() * noNames);
    console.log(randomIndex);

    // show random name on the html
    let pickedNameElement = document.getElementById("picked_name");
    pickedNameElement.innerHTML = names[randomIndex]

    // add some animations to the picked name
    pickedNameElement.classList.add('picked_animation');

    setTimeout(() => {
        pickedNameElement.classList.remove("picked_animation")
    }, 3000)
})

window.addEventListener("load", ()=>{
    console.log("page is loaded");

})