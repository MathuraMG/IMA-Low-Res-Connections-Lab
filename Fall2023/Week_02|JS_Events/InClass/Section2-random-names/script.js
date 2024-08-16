console.log("hello world");

//List names
let names = ["Maram", "Robi", "Maryse", "Ryan", "Amber", "Caity", "Liyanbing", "Jaiden", "Mishka", "Skyler", "Annika", "Elisabeth", "Pim", "Anastasia"];

//0. Wait for the page to load
window.addEventListener('load', () => {
  console.log('Page loaded!');

  //1. Select the button
  let pickButton = document.getElementById('r_button');

  //2. Listen button to be clicked
  pickButton.addEventListener('click', () => {
    console.log('Someone clicked the button!');

    //3. Pick a random name
    const noNames = names.length;
    // console.log(noNames);
    let randomNumber = Math.floor(Math.random()*noNames);
    console.log(randomNumber);
    let pickedName = names[randomNumber];
    console.log(pickedName);

    //4. Show the name on the page
    let pickedNameElement = document.getElementById("picked_name");
    pickedNameElement.innerHTML = pickedName;
  });

});

//es5 syntax
// window.addEventListener('load', function() {

// });
