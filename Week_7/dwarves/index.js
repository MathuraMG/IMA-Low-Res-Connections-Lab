const express = require('express');
const app = express();

let dwarves = {
  "details" : [
    {
      name: "doc",
      info:"(voiced by Roy Atwell in the film, André Sogliuzzo in later projects, Bill Farmer in The 7D) – The leader of the seven dwarfs, Doc wears glasses and often mixes up his words."
    },
    {
      name:"happy",
      info:"voiced by Otis Harlan in the film, Stephen Stanton in later projects, Kevin Michael Richardson in The 7D) – Happy is the jovial dwarf and is usually portrayed laughing."
    },
    {
      name: "sneezy",
      info: "(voiced by Billy Gilbert in the film, Bob Joles in later projects, Scott Menville in The 7D) – Sneezy's name is earned by his extraordinarily powerful sneezes (caused by hay fever), which are seen blowing even the heaviest of objects across a room."
    }
  ]
}

app.get('/', (request, response)=> {
  response.send("this is a response!")
})

app.get('/about', (request, response)=> {
  response.send("this page will eventually contain information about me");
})

app.get('/dwarves', (request, response)=> {
  response.json(dwarves);
})

app.get('/dwarves/:dwarf', (request, response)=> {
  // response.send('looking for info on ' + request.params.dwarf);

  let info;;
  for(let i=0;i<dwarves.details.length;i++) {
    if(dwarves.details[i].name == request.params.dwarf) {
      info = dwarves.details[i].info
    }
  }

  if(info) {
    response.send(info);
  } else {
    response.send('we could not find this dwarf');
  }

})


app.listen(5000, ()=> {
  console.log("app running on localhost:5000");
})

/*


//info from wikipedia

Doc
Happy (
Sneezy Sleepy (voiced by Pinto Colvig in the film, Bill Farmer in later projects, Stephen Stanton in The 7D) – Sleepy is always tired and appears lethargic in most situations.
Bashful (voiced by Scotty Mattraw in the film, Jeff Bennett in later projects, Billy West in The 7D) – Bashful is very shy and kind-hearted. He is also described as cute. He also has a rosy blushy face and a small shy smile.
Grumpy (voiced by Pinto Colvig in the film, Corey Burton in later projects, Maurice LaMarche in The 7D) – Grumpy initially opposes Snow White's presence in the dwarfs' home, but later warns her of the threat posed by the Queen and eagerly rushes to her aid upon realizing that she is in danger, leading the charge himself. He has the biggest nose of the dwarfs, and is frequently seen with one eye shut.
Dopey (vocal effects provided by Eddie Collins in the film, Dee Bradley Baker in The 7D) – Dopey is the only dwarf who does not have a beard. He is accident-prone and mute, with Happy explaining that he has simply "never tried" to speak. He is unvoiced like Gideon the Cat in Pinocchio, the title character as the circus elephant Dumbo, and Tootles in Peter Pan.

*/
