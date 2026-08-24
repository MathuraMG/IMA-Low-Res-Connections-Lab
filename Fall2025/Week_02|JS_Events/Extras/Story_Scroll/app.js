console.log("hello");
window.addEventListener('scroll', ()=> {
  console.log(window.scrollY, document.body.scrollHeight, window.innerWidth, window.innerHeight, window.scrollY *(window.innerWidth/window.innerHeight));
  let boxElt = document.getElementById("box");
  boxElt.style.left =window.scrollY*(window.innerWidth/(document.body.clientHeight-window.innerHeight)) +'px';
})
window.addEventListener('load', () => {
  console.log("page load");
  let dino = document.getElementById('box');
  dino.addEventListener('mouseenter', ()=> {
    dino.style.bottom = "30px";
  })
  dino.addEventListener('mouseleave', ()=> {
    dino.style.bottom = "0px";
  })
})
