console.log('File is working!');

//Name list
let names = ["Reese", "Yafan", "Daphne", "Julia", "Icy", "Jialin", "Alex", "Rebekah", "Xinyan", "David"];

//0. Load the page first
window.addEventListener("load", () => {
  console.log("Page has loaded");
  //1. Select a button
  let pickButton = document.querySelector("#button_picker");
  console.log(pickButton);

  //2. Listen for a button to get clicked
  pickButton.addEventListener("click", () => {
    console.log("Button was clicked");

    //3. Pick a random name
    let randomNo = Math.floor(Math.random() * names.length);
    console.log(randomNo);
    let randomName = names[randomNo];
    console.log(randomName);

    //4. Show that name on the page
    let nameElement = document.querySelector("#name");
    nameElement.innerHTML = randomName;

    //5. Bonus: animate the name
    nameElement.classList.add('name_animation')
    setTimeout(() => {
      nameElement.classList.remove('name_animation');
    }, 3000)
  });
});
