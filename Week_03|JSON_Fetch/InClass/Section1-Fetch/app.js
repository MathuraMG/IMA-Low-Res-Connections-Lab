console.log("hi from js");

window.addEventListener("load", () => {
  console.log("page has loaded");
  
  //fetch the data from the json
  fetch("https://pokeapi.co/api/v2/pokemon/ditto") //asking for data
  .then((response) => { //getting a promise object
    console.log(response)
    return response.json();
  })
  .then((data) => { //once the promise has resolved - once the promise status is success
    console.log(data);
    document.getElementById("name").innerHTML = data.name;  
  })

})