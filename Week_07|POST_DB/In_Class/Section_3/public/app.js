window.addEventListener('load', () => {

  console.log("Client side js is loaded!");

  fetch('/messages')
  .then(response => response.json())
  .then(data => {
    console.log(data);

    let theData = data.messages;

    //Select for element on the page
    let feed = document.getElementById('feed');
    //Loop through data and append to the page
    for (let i = 0; i < data.messages.length; i++) {
      let currentName = data.messages[i].name;
      let currentMessage = data.messages[i].message;

      let currentEl = document.createElement('p');
      currentEl.innerHTML = currentName + " - " + currentMessage;

      feed.appendChild(currentEl);

    }

  })
  .catch(error => {
    console.log(error)
  });

});


//Create an event listener to collect and POST data
let msgButton = document.getElementById('msg-submit');
msgButton.addEventListener('click', () => {
  console.log("Button was clicked!");

  let nameInput = document.getElementById('name-input');
  let currentName = nameInput.value;

  let msgInput = document.getElementById('msg-input')
  let currentMessage = msgInput.value;

  let messageObj = {
    name: currentName,
    message: currentMessage
  };
  console.log(messageObj);

  let messageObjJSON = JSON.stringify(messageObj);
  console.log(messageObjJSON);

  fetch('/newMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: messageObjJSON
  })
    .then(response => response.json())
    .then(data => {
      console.log("Did this work?");
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });

  let feed = document.getElementById('feed');
  let currentEl = document.createElement('p');
  currentEl.innerHTML = currentName + " - " + currentMessage;
  feed.appendChild(currentEl);

  nameInput.value = ''
  msgInput.value = '';


});

