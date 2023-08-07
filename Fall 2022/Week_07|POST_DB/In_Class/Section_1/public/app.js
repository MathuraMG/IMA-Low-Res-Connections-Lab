window.addEventListener("load",() => {
  let msgButton = document.getElementById("msg-submit");
  msgButton.addEventListener("click", () => {
  let msgText = document.getElementById("msg-input").value;

  console.log(msgText);

  //send the msgText to the server
  let msgObj = {
    "msg" : msgText
  }
  let msgObjectJSON = JSON.stringify(msgObj)
  fetch('/message', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: msgObjectJSON
        })
        .then(res => res.json())
        .then(data => {  console.log(data )})



  })


})
