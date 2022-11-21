let myVideo;
let otherVideo;

function setup() {
  createCanvas(400, 400);

  myVideo = createCapture(VIDEO, function (stream) {
    let p5l = new p5LiveMedia(
      this,
      "CAPTURE",
      stream,
      "jZQ64AMJc_TESTTEST",
      "https://localhost"
    );
    p5l.on("stream", gotStream);
  });
  myVideo.muted = true;
  myVideo.hide();
}

function draw() {
  background(220);
  stroke(255);
  if (myVideo != null) {
    image(myVideo, 0, 0, width / 2, height);
    text("My Video", 10, 10);
  }
  ellipse(mouseX, mouseY, 100, 100);

  if (otherVideo != null) {
    image(otherVideo, width / 2, 0, width / 2, height);
    text("Their Video", width / 2 + 10, 10);
  }
}

// We got a new stream!
function gotStream(stream, id) {
  // This is just like a video/stream from createCapture(VIDEO)
  otherVideo = stream;
  //otherVideo.id and id are the same and unique identifiers
  otherVideo.hide();
}
