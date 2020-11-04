let socket = io();
let rooms = ["pizza", "pie", "cake"];

window.addEventListener('load', () => {
  for(let i =0;i<rooms.length;i++){
    let button = document.createElement('button');
    button.innerHTML = rooms[i];
    button.classList.add('option-button');
    button.addEventListener('click', () => {
      socket.emit('joinroom', {
        room: rooms[i]
      })
    })
    document.getElementById('options').appendChild(button);
  }
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
    elt.innerHTML= data[i];
    document.getElementById('messages').appendChild(elt);
  }
})

//when another client in your room send a message, and you receive it
socket.on('message', (data) => {
  console.log(data)
  let elt = document.createElement('p');
  elt.innerHTML= data.message;
  document.getElementById('messages').appendChild(elt);
})
