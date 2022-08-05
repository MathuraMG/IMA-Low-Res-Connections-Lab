/*Based on Shawn Van Every's p5LiveMedia Example: https://github.com/vanevery/p5LiveMedia */

let myVideo = null;

function setup(){
  const myCanvas = createCanvas(window.innerWidth, window.innerHeight);
  myCanvas.parent("canvas-container");
  background(255);

  //add stream constraints
  let constraints = {audio: true, video: true};

  //create a new element with the video feed
  myVideo = createCapture(VIDEO, stream => {
    let p5lm = new p5LiveMedia(this, "CAPTURE", stream, "mystream");
    //listen for a 'stream' event to show other videos
    p5lm.on('stream', gotStream);
  });

  //mute my own video to avoid feedback
  myVideo.elt.muted = true;
}

//callback function to show another video
let otherVideo;
function gotStream(stream){
  otherVideo = stream;
}


