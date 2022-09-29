let astroData;
let isAstroDataReady = false;

let astros = [];

let myCanvas;

window.addEventListener('load',()=> {
  fetch("http://api.open-notify.org/astros.json")
  .then(response => response.json())
  .then(data => {
    astroData = data;
    isAstroDataReady = true;
    console.log(data); //all the information
  })
})


function setup() {
  myCanvas = createCanvas(400,400);
  myCanvas.parent("container");
}

function draw() {
  background(23,250,140);
  //draw ellipses with the info we got from the api
  if(isAstroDataReady && astros.length==0) {
    //populate the astros array with Artro object
    

    for(let i =0;i<astroData.people.length;i++) {
      astros.push(new Astro(i*30+20,height/2, astroData.people[i].name));
    }

  } else if(isAstroDataReady) {
    for(let i =0;i<astros.length;i++) {
      astros[i].draw();
    }
  }
  
  else {
    console.log("data is not ready yet!")
  }
}


function mousePressed() {
  for(let i =0;i<astros.length;i++) {
    astros[i].clicked(mouseX,mouseY);
  }
}


class Astro {
  constructor(x,y,name) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.r = 10;
    this.speedx = random(-5,5);
    this.speedy = random(-5,5);
  }
  draw() {
    ellipse(this.x,this.y,2*this.r, 2*this.r);
    this.x += this.speedx;
    this.y += this.speedy;
    if(this.x <0 || this.x>width) {
      this.speedx = -this.speedx;
    }
    if(this.y <0 || this.y>height) {
      this.speedy = -this.speedy;
    }
  }
  clicked(mX, mY) {
    if(dist(mX,mY,this.x,this.y) < this.r) {
      console.log(this.name);
      document.getElementById("name").innerHTML = this.name;
    }
  }
}


/* STEPS
1. fetched the data
2. added p5 library
3. access the data within the draw function

*/