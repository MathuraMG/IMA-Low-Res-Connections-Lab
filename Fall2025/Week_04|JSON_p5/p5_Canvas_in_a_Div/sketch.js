function setup() {
	//Create the canvas and save it to a variable;
	const myCanvas = createCanvas(400,300);
	//Set the parent of the canvas to an exisitng html element's id value 
	myCanvas.parent("canvas-container");
	background(220,40,50);
}

function draw(){

}

function mousePressed(){
    ellipse(mouseX,mouseY,30,30);
}