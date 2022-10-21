window.addEventListener('load', () => {
  console.log('Window loaded');
  let feed = document.getElementById('feed');

  //fetch all messages from the server
  fetch('/messages')
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    //access messages
    let messages = data.data;

    //loop through them
    for(let i =0; i<messages.length; i++){
      // console.log(messages[i]);
      let message = messages[i].message;
      let time = messages[i].time;

      //create a new paragraph
      let newMessage = document.createElement('p');
      let newMessageContent = `${time}: ${message}`;
      newMessage.innerHTML = newMessageContent;

      //append to the feed
      feed.appendChild(newMessage);
    }

  })
  .catch(err => {
    console.log(err);
  });

  //get submit button and input value on a click
  let msgButton = document.getElementById('msg-submit');
  msgButton.addEventListener('click', ()=> {
    let msgValue = document.getElementById('msg-input').value;
    console.log(msgValue);

    //Create an object to send to the server
    let messageObject = {
      message: msgValue
    };

    //stringify the object
    let messageObjectJSON = JSON.stringify(messageObject);

    //create a POST request
    fetch('/new-message',{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: messageObjectJSON
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);

      //add new message to the feed
      let message = data.message.message;
      let time = data.message.time;
      let newMessage = document.createElement('p');
      let newMessageContent = `${time}: ${message}`;
      newMessage.innerHTML = newMessageContent;
      // feed.appendChild(newMessage);
      //insert to the top of the feed
      feed.insertBefore(newMessage, feed.firstChild);
    })
    .catch(err => {
      console.log(err);
    });
  });
})
