let names = ["Doc", "Sleepy", "Dopey", "Grumpy", "Happy", "Bashful", "Sneezy"];
let selectedNames = [];

//wait for the page to load
window.addEventListener("load", () => {
  console.log("page loaded");

  //display all the names
  let namesList = document.getElementById('names-list');
  names.forEach(element => {
    let namesItem = document.createElement("li");
    namesItem.innerHTML = element;
    namesItem.classList.add("names__list-item");
    namesList.appendChild(namesItem);
  });

  //assign the button to a variable
  let pickButton = document.getElementById("pick-name-button");
  //add an event listener to the button
  pickButton.addEventListener("click", () => {
    console.log("button clicked");

    //Select a random name from the "names" array
    const noNames = names.length;
    let randomNumber = Math.floor(Math.random()*noNames);
    let pickedName = names[randomNumber];
    console.log(pickedName);
    //move the picked name into the HTML <p> tag
    let pickedNameElement = document.getElementById("picked-name");
    pickedNameElement.innerHTML = pickedName;

    /* ADDING ADDITIONAL FEATURES */
    //remove the pickedName from the names list
    names = arrayRemove(names, pickedName);
    namesList.innerHTML = "";
    names.forEach(element => {
      let namesItem = document.createElement("li");
      namesItem.innerHTML = element;
      namesItem.classList.add("names__list-item");
      namesList.appendChild(namesItem);
    });

    //add the pickedName to the "selected list"
    let namesPickedList = document.getElementById("names-picked-list");
    namesPickedList.innerHTML = "";
    selectedNames.push(pickedName);
    selectedNames.forEach(element => {
      let namesItem = document.createElement("li");
      namesItem.innerHTML = element;
      namesItem.classList.add("names__list-item");
      namesPickedList.appendChild(namesItem);
    });

    //animation
    pickedNameElement.classList.add("rpicker__name--animate")
    setTimeout(() => {
      pickedNameElement.classList.remove("rpicker__name--animate")
    }, 3000);
  })
})

arrayRemove = (arr, value) => {
  return arr.filter((ele) => {
      return ele != value;
  });
}

