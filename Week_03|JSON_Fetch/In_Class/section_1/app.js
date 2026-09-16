// function getRandomQuestion() {
//   fetch("data.json")
//   .then(response => response.json())
//   .then((data) => {
//     //select a random statement
//     let totalQuestions = data.personality_test.length;
//     let randNo = Math.floor(Math.random()*totalQuestions);
//     document.getElementById("question").innerHTML = data.personality_test[randNo];
//   })
// }

async function getRandomQuestion() {
  let response = await fetch("data.json")
  let data = await response.json();
  let totalQuestions = data.personality_test.length;
  let randNo = Math.floor(Math.random()*totalQuestions);
  document.getElementById("question").innerHTML = data.personality_test[randNo];
  
}

getRandomQuestion();

/*
//longer version

(response) => {
  return response.json();
}

//shorthand
response => response.json();

*/