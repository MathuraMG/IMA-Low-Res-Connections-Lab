# randomName steps
* **HTML Starter Code**
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <script src="app.js"></script>
  <title>Random Name</title>
</head>
<body>
  <section>
    <h1> Random Name Picker </h1>
    <p> Name </p>
    <button> Pick! </button>
  </section>
</body>
</html>
```
* **Remember to add an ID to the button!**
```
<button id="pick-name-button"> Pick! </button>
```

* **Set up the names and the event handlers in javascript in app.js**
```
let names = ["Doc", "Sleepy", "Dopey", "Grumpy", "Happy", "Bashful", "Sneezy"];

//wait for the page to load
window.addEventListener("load", () => {
  console.log("page loaded");
  //assign the button to a variable
  let pickButton = document.getElementById("pick-name-button");
  //add an event listener to the button
  pickButton.addEventListener("click", () => {
    console.log("button clicked");
  })
})
```

* **Within the click button event, select a random name from the `names` array**
```
//Select a random name from the "names" array
const noNames = names.length;
let randomNumber = Math.floor(Math.random()*noNames);
let pickedName = names[randomNumber];
console.log(pickedName);
```

* **Populate the pickedName in the HTML `<p>` tag | You need to add an id to the HTML `<p>` tag as well**

HTML
```
<p id="picked-name"> Name </p>
```
Javascript
```
 //move the picked name into the HTML <p> tag
let pickedNameElement = document.getElementById("picked-name");
pickedNameElement.innerHTML = pickedName;
```
* **It's done!! Now let's style it**

Add the classes required in HTML
```
 <section class="rpicker">
  <h1 class="rpicker__title"> Random Name Picker </h1>
  <p class="rpicker__name" id="picked-name"> Name </p>
  <button class="rpicker__button" id="pick-name-button"> Pick! </button>
</section>
```

Add the styling
```
.rpicker {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.rpicker__title {
  margin: 0;
}

.rpicker__name {
  font-size: 108px;
  margin: 18px 0;
  text-transform: uppercase;
  font-weight: 900;
}
```

**And we're done!!**

**The steps below are to add extra features**
**1. Showing the list of namess**

Adding the HTML
```
 <div class="rpicker__names">
  <div>
    <h2 class="names__subtitle">All Names</h2>
    <ul class="names__list"></ul>
  </div>
  <div>
    <h2 class="names__subtitle">Picked Names</h2>
    <ul class="names__picked-list"></ul>
  </div>
</div>
```

Adding the JS - add within the load event
```
//display all the names
let namesList = document.getElementById('names-list');
names.forEach(element => {
  let namesItem = document.createElement("li");
  namesItem.innerHTML = element;
  namesItem.classList.add("names__lsit-item");
  namesList.appendChild(namesItem);
});
```

* **2.remove pickedName from full list, and add to selected list**
Add this in the js file within the button click event handler
```
//remove the pickedName from the names list
    names = arrayRemove(names, pickedName);
    namesList.innerHTML = "";
    names.forEach(element => {
      let namesItem = document.createElement("li");
      namesItem.innerHTML = element;
      namesItem.classList.add("names__lsit-item");
      namesList.appendChild(namesItem);
    });
```
```
//add the pickedName to the "selected list"
  let namesPickedList = document.getElementById("names-picked-list");
  namesPickedList.innerHTML = "";
  selectedNames.push(pickedName);
  selectedNames.forEach(element => {
    let namesItem = document.createElement("li");
    namesItem.innerHTML = element;
    namesItem.classList.add("names__lsit-item");
    namesList.appendChild(namesItem);
  });
  ```
  
  * **3.Animate the picked name**
  ```
//animation
  pickedNameElement.classList.add("rpicker__name--animate")
  setTimeout(() => {
    pickedNameElement.classList.remove("rpicker__name--animate")
  }, 3000);
  ```
  CSS
  ```
  /* ANIMATE NAME */
.rpicker__name--animate {
  font-size: 10px;
  animation-name: nameZoon ;
  margin: 18px 0;
  text-transform: uppercase;
  font-weight: 900;
  animation-duration: 3s;
}

@keyframes nameZoon {
  from {font-size: 10px;}
  to {font-size: 108px;}
}
```
