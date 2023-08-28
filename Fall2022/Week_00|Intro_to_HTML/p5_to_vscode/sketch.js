let img;
function setup() {
  createCanvas(400, 400);
  img = createImg('media/cat.jpg');
  background(220);
}

function draw() {
  image(img, mouseX, mouseY, 30,30);
}