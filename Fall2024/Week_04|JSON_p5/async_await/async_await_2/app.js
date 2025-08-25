console.log("hello");
async function getFirstAstroData() {
  let response = await fetch("http://api.open-notify.org/astros.json") ;
  let data = await response.json();
  console.log(data);
  let firstName = data.people[0].name;
  let astroSearch = firstName.replace(' ', '%20');

  let astroUrl = 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + astroSearch;
  console.log(astroUrl);
  let wikiResp = await fetch(astroUrl);
  let wikiData = await wikiResp.json();
  console.log(wikiData); 
}

getFirstAstroData();

