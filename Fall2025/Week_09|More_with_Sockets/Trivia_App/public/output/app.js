let socket = io('/output');

window.addEventListener('load', () => {
    document.querySelector('#get-question').addEventListener('click', () => {
        socket.emit('getquestion');
        console.log('emitting a socket ping');
    })
    document.querySelector('#get-answer').addEventListener('click', () => {
        socket.emit('getanswer');
    })
})

socket.on('answers', (data)=> {
    console.log(data);
    document.querySelector('#answer-total').innerHTML = "Number of people who answered the question : " + data.total;
    document.querySelector('#answer-right').innerHTML = "How many got it correct : " +  data.right;
    document.querySelector('#answer-wrong').innerHTML = "How many got it incorrect : " + data.wrong;
})

socket.on('question', (data)=> {
    console.log(data);
    document.querySelector('#question').innerHTML = data.question;
})
