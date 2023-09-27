let toppings = [];

window.addEventListener("load", () => {
  //fetch the data
  let ccData = "https://raw.githubusercontent.com/gracesong617/Class-Grace-CL/main/project1/data.json";
  fetch(ccData)
  .then( response => response.json()  )
  .then( data => { 
    toppings = data.Cakes.toppings;
    console.log(toppings);

    //populate the dropdown
    for(let i =0;i<toppings.length;i++) {
      //create a new option element
      let toppingsOption = document.createElement("option");
      toppingsOption.innerHTML = toppings[i].name;
      toppingsOption.value = toppings[i].name;
      let toppingsDropdown = document.getElementById("toppings-select");
      toppingsDropdown.appendChild(toppingsOption);
    }

    // what do you do when the item is selected?
    let toppingsDropdown = document.getElementById("toppings-select");

    toppingsDropdown.addEventListener("change", (e) => {
      let index = e.target.selectedIndex;
      document.getElementById("toppings-img").src = toppings[index].img;

    })
  


  })
})




/* p5 specific */
function setup() {
  createCanvas(500,500);
  background("teal");
}

function draw() {
  if(toppings.length >0)
  {
    for(let i = 0;i<toppings.length;i++) {
      ellipse(100,100*i,40,40);
    }
  }

  rect(0,0,100,100);
  
}

function mousePressed() {
  if(mouseX<100 && mouseY<100) {
    let randomIndex = floor(random(0,toppings.length));
    console.log(toppings[randomIndex].name);
  }
}




