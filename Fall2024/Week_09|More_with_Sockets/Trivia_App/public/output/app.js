let socket = io('/output');

window.addEventListener('load', () => {
    document.getElementById('get-question').addEventListener('click', () => {
        socket.emit('getquestion');
        console.log('emitting a socket ping');
    })
    document.getElementById('get-answer').addEventListener('click', () => {
        socket.emit('getanswer');
    })
})

socket.on('answers', (data)=> {
    console.log(data);
    document.getElementById('answer-total').innerHTML = "Number of people who answered the question : " + data.total;
    document.getElementById('answer-right').innerHTML = "How many got it correct : " +  data.right;
    document.getElementById('answer-wrong').innerHTML = "How many got it incorrect : " + data.wrong;
})

socket.on('question', (data)=> {
    console.log(data);
    document.getElementById('question').innerHTML = data.question;
})