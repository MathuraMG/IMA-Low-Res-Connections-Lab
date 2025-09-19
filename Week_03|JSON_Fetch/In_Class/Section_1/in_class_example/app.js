console.log('The page is working!')

//1. Make sure the page loads
window.addEventListener('load', () => {
  let container = document.querySelector('.container');

  console.log('The page has loaded');

  //2. Fetch data
  fetch('birds_antarctica.json')
    .then((response) => { // 3. get the response
      return response.json() // 4. parse data out of response
    })
    .then((data) => { //now we have access to the data
      console.log(data);
      console.log(data.description);

      //5. use the data
      let birdFamilies = data.birds;

      for (let i = 0; i < birdFamilies.length; i++) {
        let family = document.createElement('span');
        family.innerHTML = birdFamilies[i].family; // actual content
        container.appendChild(family);
      }
    })
    .catch(error => {
      console.log(error);
    });

  //6. We can do the same with a dynamic file
  fetch('http://api.open-notify.org/astros.json')
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data);
      console.log(data.number);
      //do something with the astronaut data

    })
    .catch(error => {
      console.log(error);
    })
});
