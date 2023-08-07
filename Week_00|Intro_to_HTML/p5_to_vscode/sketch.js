//define variables at the top
let img;

// setup function code
function setup() {
  createCanvas(windowWidth, windowHeight);
  img = createImg("media/cat.jpg", "cat");
  background(220);
}

//draw function code
function draw() {
  image(img, mouseX, mouseY, 30,30);
}
