let socket = io();
let rooms = ["pizza", "pie", "cake"];

let selectedRoom = "";

window.addEventListener('load', () => {
  //create the option buttons on page load
  for(let i =0;i<rooms.length;i++){
    let button = document.createElement('button');
    button.innerHTML = rooms[i];
    selectedRoom = rooms[i];
    button.classList.add('option-button');

    //what should the option buttons do when they are clicked
    button.addEventListener('click', () => {

      //some styling
      let buttons = document.getElementsByClassName('option-button');
      [].forEach.call(buttons, function(button) {
        console.log(button);
          button.classList.remove("option-button-selected");
      });
      buttons[i].classList.add("option-button-selected")
      document.getElementById('send-messages').classList.add('send-messages-show')

      //emit a message requesting to join the room
      socket.emit('joinroom', {
        room: rooms[i]
      })
    })
    document.getElementById('options').appendChild(button);
  }

  //send the message to the server when a new message is typed up
  let sendbutton = document.getElementById('send-button');
  sendbutton.addEventListener('click', () => {
    let message = document.getElementById("my-message").value;
    socket.emit('message', {
      message: message
    })
  })
})

//as soon as you join a room, get the latest messages in that room
socket.on('messages', (data) => {
  console.log(data);
  document.getElementById('messages').innerHTML = "";
  for (let i = 0; i< data.length; i++) {
    let elt = document.createElement('p');
    elt.classList.add('message');
    elt.innerHTML= data[i];
    document.getElementById('messages').appendChild(elt);
  }
})

//when another client in your room send a message, and you receive it
socket.on('message', (data) => {
  console.log(data)
  let elt = document.createElement('p');
  elt.innerHTML= data.message;
  elt.classList.add('message');
  document.getElementById('messages').appendChild(elt);
})
