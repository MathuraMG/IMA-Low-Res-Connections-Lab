window.addEventListener('load', () => {
  let feed = document.getElementById('feed');

  //STEP 5. Fetch all the messages from the server
  fetch('/messages')
  .then(response => response.json())
  .then(data => {
    // console.log(data);

    //STEP 6. Add messages to html
    let messages = data.data;
    // console.log(messages);
    for(let i=0; i<messages.length; i++){
      console.log(messages[i]);

      let message = messages[i].message;
      let time = messages[i].time;
      let messageContent = time + ": " + message;
      let newMessage = document.createElement('p');
      newMessage.innerHTML = messageContent;

      //append to the feed
      feed.appendChild(newMessage);
    }
  })

  //STEP 7. Get a new message input value
  let msg = document.getElementById('msg-input');
  let msgButton = document.getElementById('msg-submit');

  msgButton.addEventListener('click', () => {
    let msgValue = msg.value;
    console.log(msgValue);

    let msgObj = {
      message: msgValue
    }

    //Step 8.2 Stringify the data
    let messageObjJSON = JSON.stringify(msgObj);
    // console.log(msgObj);
    // console.log(messageObjJSON);

    //STEP 8. Create a fetch POST request
    fetch('/new-message', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: messageObjJSON
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);

      //STEP 13. Update the feed with a new message
      let message = data.message;
      let time = data.time;

      //Create new element
      let newMessage = document.createElement('p');
      let newMessageContent = time + ": " + message;
      newMessage.innerHTML = newMessageContent;

      //append to the feed
      feed.insertBefore(newMessage, feed.firstChild);
    })
    .catch(error => {
      console.log(error);
    });
  });
});
