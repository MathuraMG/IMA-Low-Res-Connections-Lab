const TOTALIMAGES = 8;
//have some starting images once the page is loaded
window.addEventListener("load", ()=> {
  createExquisiteCorpse();

  //have a button to randomise the corpse
  let randomiseButton = document.getElementById("randomise-button");
  randomiseButton.addEventListener("click", ()=> {
    setTimeout(()=> { 
      createExquisiteCorpse();
    },1000)
    
  })
})



function createExquisiteCorpse() {
  let headIndex = Math.floor(Math.random()*TOTALIMAGES);
  let torsoIndex = Math.floor(Math.random()*TOTALIMAGES);
  let legIndex = Math.floor(Math.random()*TOTALIMAGES);
  console.log(headIndex, torsoIndex, legIndex);
  
  let headImageSrc = "assets/heads/" +headIndex + ".png";
  let torsoImageSrc = "assets/torsos/" +torsoIndex + ".png";
  let legImageSrc = "assets/legs/" +legIndex + ".png";

  //add the image to the respectove elt
  document.getElementById("image-head").src= headImageSrc;
  document.getElementById("image-torso").src= torsoImageSrc;
  document.getElementById("image-leg").src= legImageSrc;
}