async function getSleepData() {
  let response = await fetch("https://sheetdb.io/api/v1/4gezo4wlvlnq8");
  let data = await response.json();
  console.log(data);
}


document.getElementById("getData").addEventListener("click", () => {
  getSleepData();
})

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  
  background("#747272");
  ellipse(width/2, height/2, 100);
  canvas.parent("background-container");
}
