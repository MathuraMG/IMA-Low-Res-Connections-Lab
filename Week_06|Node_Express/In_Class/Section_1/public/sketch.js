console.log('This is client-side code');

window.addEventListener('load', () => {
  //fetch data
  fetch('/pizzas')
  .then(response => {
    return response.json()
  })
  .then(data => {
    //Do something with the data
    console.log(data.data);
  })
  .catch(error => {
    console.log(error);
  });

  //Access button and input
  let button = document.querySelector('#button');
  let input = document.querySelector('#input');

  button.addEventListener('click', () => {
    let pizza = input.value;
    console.log(pizza);

    let route = `/pizzas/${pizza}`;
    console.log(route);

    //fetch this specific route
    fetch(route)
    .then(response => {
      return response.json();
    })
    .then(data => {
      //Do something with the data
      console.log(data);
    })
  })
});
