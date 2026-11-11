let myVideo = null;

function setup() {
  createCanvas(400,400);

  myVideo = createCapture(VIDEO, 
    function(stream) {
	let p5lm = new p5LiveMedia(this, "CAPTURE", stream, "lowres-g-sec1")
  	p5lm.on('stream', gotStream);
    }
  );
}

let otherVideos = [];
function gotStream(stream, id) {
  otherVideo = stream;
  //otherVideo.id and id are the same and unique identifier
}

function draw() {
  if (myVideo != null) {
    image(myVideo,0,0,width/2,height);
    text("My Video", 10, 10);
  }

  if (otherVideo != null) {
    image(otherVideo,width/2,0,width/2,height);
    text("Their Video", width/2+10, 10);
  }  
}