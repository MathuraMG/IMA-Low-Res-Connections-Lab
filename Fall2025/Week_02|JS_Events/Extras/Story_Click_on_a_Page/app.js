//story
let story = ["I", "found", "a", "picture", "on", "my", "phone", "sleeping.", "I", "live", "alone."];

//make sure the page loads first
window.addEventListener('load', () => {
  let counter = 0;
  let container = document.getElementById('container');

  //listen for clicks on the page and get an exact location
  window.addEventListener('click', (e) => {
    console.log('you have clicked here, ' + e.x + ',' + e.y);
    console.log('counter: ', counter);

    //remove all html elements if story ends
    if (counter > 10) {
      console.log('cleaning up all content');
      //remove all children
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      counter = 0; // reset to the beginning
    } else { //otherwise keep adding html elements
      let span = document.createElement('span');
      span.innerHTML = story[counter];
      span.style.position = "absolute";
      span.style.top = `${e.y}px`;
      span.style.left = `${e.x}px`;
      //add random color
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      span.style.color = `rgb(${r}, ${g}, ${b})`;
      //add random size
      span.style.fontSize = Math.floor(Math.random() * (90 - 20) + 20) + "px";
      container.appendChild(span);
      counter++; //move on to the next word
    }
  });
});
