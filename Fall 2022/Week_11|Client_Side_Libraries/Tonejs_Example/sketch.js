// const osc = new Tone.Oscillator(440, "sine").toDestination().start();


let notes = [523,587,659,698,783,880,987,1046];

window.addEventListener("load", () => {
  addKeys();
})

function addKeys() {
  notes.forEach((note,i) => {
    const osc = new Tone.Oscillator(note, "sine").toDestination()
    let button = document.createElement("button");
    button.classList.add("key");
    button.addEventListener("mousedown", ()=> {
      osc.start();
    })
     button.addEventListener("mouseup", ()=> {
       console.log("up");
       osc.stop();
    })
    document.getElementById("container").appendChild(button);
  })
}