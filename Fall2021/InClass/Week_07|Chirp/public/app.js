window.addEventListener('load', function(){
  //SUBMIT A MESSAGE
  let msgButton = document.getElementById("msg-submit");
    msgButton.addEventListener('click', function(){
        let msg = document.getElementById("msg-input").value;
        console.log(msg);

        let msgObject = {
          "msg" : msg
        }
        let msgObjectJSON = JSON.stringify(msgObject);
        console.log(msgObjectJSON);

        //Send the data to the server
        fetch('/message', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: msgObjectJSON
        })
        .then(res => res.json())
        .then(data => {  console.log(data )})
    })

    //VIEW ALL MESSAGES
    let viewMsgButton = document.getElementById("view-msgs");
      viewMsgButton.addEventListener('click', function(){
          fetch('/messages')
          .then(res => res.json())
          .then(data => {
            console.log(data);
            data.messages.forEach(msg=> {
              let li = document.createElement('li');
              li.innerHTML = msg;
              document.getElementById('msgs').appendChild(li);
              console.log(msg)
            })
          })
      })
})
