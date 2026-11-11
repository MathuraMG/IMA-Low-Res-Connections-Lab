let names = ['ML5', 'D3','A-Frame','threeJS','p5-play','tonejs','leaflet','p5livemedia'];
const ideas = [
    "A day in my life",
    "Weather for my feelings",
    "Museum of ordinary things",
    "Make a tiny pet",
    "Class portrait",
    "Tiny instrument",
    "Lost and found",
    "My neighbourhood",
    "Dear future me",
];
window.addEventListener("click", ()=> {
  let hand = document.getElementById("hand");
  let name = document.getElementById("name");
  hand.classList.add("hand-animate");
  name.classList.add("chit-animate");
  let randomName = names[Math.floor(Math.random()*names.length)];
  name.innerHTML = randomName;

  


  setTimeout(() => {
    hand.classList.remove("hand-animate");
    const idea = ideas[Math.floor(Math.random() * ideas.length)];
  document.getElementById("idea").innerHTML = idea;
  }, 3000);

  setTimeout(() => {
    name.classList.remove("chit-animate");
  }, 3000);
  console.log("dbl click");
})