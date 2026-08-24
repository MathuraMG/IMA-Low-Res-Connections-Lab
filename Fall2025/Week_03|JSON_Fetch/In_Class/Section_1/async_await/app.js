console.log("The page is working");

//1. Make sure the page loads first
window.addEventListener('load', async () => {

  let container = document.querySelector('.container');

  console.log('The page has loaded');
  //2. Request data
  let response = await fetch('birds_antarctica.json');
  //3. Access the data when the response is ready
  let data = await response.json();
  //4. Do something with the data
  console.log(data);
  let birdFamilies = data.birds;

  for (let i = 0; i < birdFamilies.length; i++) {
    let family = document.createElement('span');
    family.innerHTML = birdFamilies[i].family; // actual content
    container.appendChild(family);
  }
   //6. We can do the same with a dynamic file
  let responseTwo = await fetch('http://api.open-notify.org/astros.json');
  let dataTwo = await responseTwo.json();
  console.log(dataTwo);
});
