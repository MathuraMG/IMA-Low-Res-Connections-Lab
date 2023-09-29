console.log("Page is loading");

//Make sure the window loads first
window.addEventListener('load', () => {
  console.log("The page has loaded");

  async function getAstroData(){
    //Send a request for data
    let response = await fetch("http://api.open-notify.org/astros.json");
    let data = await response.json();
    //Do something with the data - add number to the page
    let astronautNo = data.number;

    //Create a p element that will show the number
    let numberPar = document.createElement('p');
    numberPar.innerHTML = astronautNo;

    //Access the div container and append to it
    let containerDiv = document.getElementById('data_container');
    containerDiv.appendChild(numberPar);

    //add styling to number paragraph
    numberPar.setAttribute('class', 'astronaut_number');

    //Also show names
    let astronauts = data.people;
    astronauts.forEach(async (element) => {
      let astronautName = element.name;
      //Replace space in astronaut name w/ %20
      let astroSearch = astronautName.replace(' ', '%20');

      //API url that we will ping
      let astroUrl = 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + astroSearch;

      let wikiResponse = await fetch(astroUrl);
      let wikiData = await wikiResponse.json();
      // console.log(wikiData);

      //access url only
      let url = wikiData[3][0];

      //for every astronaut create a link
      let astroLink = document.createElement('a');
      astroLink.innerHTML = astronautName;

      //set attributes
      astroLink.setAttribute('href', url);
      astroLink.setAttribute('target', '_blank');

      //attach to the same div
      containerDiv.appendChild(astroLink);

      //add some styling
      astroLink.setAttribute('class', 'astronaut_name');
    })
  }
  getAstroData();
});
