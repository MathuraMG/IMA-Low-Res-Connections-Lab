const apiURL = "http://api.open-notify.org/astros.json";

/* version 2 - async await */
async function getDatawithAsyncAwait() {
  let response = await fetch(apiURL);
  let data = await response.json();
  console.log(data);
  console.log("end of function");
}

console.log("before calling the function");
getDatawithAsyncAwait();

/** version 1 - then 
function getDatawithThen() {
  fetch(apiURL)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  
  console.log("end of function");
}

console.log("before calling the function");
getDatawithThen();

**/


