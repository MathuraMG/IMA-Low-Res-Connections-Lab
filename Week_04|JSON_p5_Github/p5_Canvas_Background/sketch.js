function setup() {
	//Create the canvas and save it to a variable;
	const myCanvas = createCanvas(window.innerWidth, window.innerHeight);
	//Set the parent of the canvas to an exisitng html element's id value
	myCanvas.parent("canvas-container");
	background(220, 40, 50);
}

function mouseMoved() {
	noStroke();
	fill(255, 255, 255, 20)
	ellipse(mouseX, mouseY, 70, 70);
}
