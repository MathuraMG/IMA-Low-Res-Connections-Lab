window.addEventListener("load", ()=> {
  fetch("/allChirps")
  .then( res => res.json())
  .then(data => {
    console.log(data);
    allChirps = data.data;
    //populate the feed with all this information
    for(let i=0;i<allChirps.length;i++) {
      let name = allChirps[i].name;
      let msg = allChirps[i].msg;
      let displayChirp = name + " : " + msg;
      //creating a new HTML li element
      let displayElement = document.createElement('li');
      //populating the HTML element
      displayElement.innerHTML = displayChirp;
      //make it the child of the exisiting ul HTML element
      let listContainer = document.getElementById("chirp-feed");
      listContainer.appendChild(displayElement);
    }
  })


  //add an event listener to submit the chirp
  let chirpSubmitButton = document.getElementById("chirp-submit");
  chirpSubmitButton.addEventListener("click", () => {
    let name = document.getElementById("chirp-name").value;
    let msg = document.getElementById("chirp-msg").value;
    console.log(name, msg)

    //create a POST request to the server
    let chirpObject = {
      "name" : name,
      "msg" : msg
    }

    chirpObjectJSON = JSON.stringify(chirpObject)

  fetch('/chirp', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: chirpObjectJSON
  })
  .then(res => res.json())
  .then(data => {  
    console.log("success");
    console.log(data )
    //write some HTML to add it to the feed
  })



  })
})