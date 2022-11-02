let socket = io('/input');
let isAnswered = false;

window.addEventListener('load', () => {
    createOptionButtons();
})

socket.on('question', (data)=> {
    isAnswered = false;
    console.log(data);
    document.body.style.background = "#ffffff";
    let options = data.options;
    document.getElementById('questions').innerHTML = data.question;
    populateOptions(data.options);
})

//change the colour of the screen based on answer
socket.on('answer', (data) => {
    if(data.answer) {
        document.body.style.background = "#62ca7a";
    } else {
        document.body.style.background = "#f33a66";
    }
})

/* Functions to populate the HTML via javascript */

// function : create the option buttons on page load
function createOptionButtons() {
    for(let i =0;i<4;i++) {
      let button = document.createElement('button');
      let buttonSpan = document.createElement('span');
      buttonSpan.classList.add("button-span");
      button.innerHTML = 1+i;
      button.classList.add("button-options");
      
      // when user selects answer
      button.onclick = () => {
          if(isAnswered == false) { 
              socket.emit('answer', {answer: i})
              isAnswered = true;
          }
      }
      button.appendChild(buttonSpan);
      document.getElementById('answers').appendChild(button);
    }
  }

//function : populate the options when question is asked
function populateOptions(options) {
    let optionsElt = document.getElementsByClassName('button-span');
    for(let i=0;i<optionsElt.length;i++ ){
      optionsElt[i].innerHTML = options[i];
    }
}
