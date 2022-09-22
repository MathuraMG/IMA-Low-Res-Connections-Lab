window.addEventListener('load', function() {
  fetch('https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=apple') //fetch requests data from URL
  .then(response => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch(function(e) {
    console.log(e); //showing error IF the promise was rejected
  })
})




// window.addEventListener('load', function() {
//   fetch('https://pokeapi.co/api/v2/pokemon/pikachu') //fetch requests data from URL
//   .then(response => response.json())
//   .then((data) => {
//     console.log(data.abilities[0]); //accessing the data IF the promise was fulfilled
//     let elt = document.createElement('p');
//     elt.innerHTML = data.abilities[0].ability.name;
//     document.body.appendChild(elt);
//   })
//   .catch(function(e) {
//     console.log(e); //showing error IF the promise was rejected
//   })
// })


/*

function(e) {
  return e.json();
}

1. replace "function" with "=>"
(e) => {
  return e.json();
}

2. remove the () if there's only one param
e => {
  return e.json();
}

3. remove return and {} of you are ONLY returning
e => e.json()



// skeletal form

function() {

}

VS. 

() => {

}

*/