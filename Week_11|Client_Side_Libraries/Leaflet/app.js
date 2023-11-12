window.addEventListener('load', () => {
  //Create a map
  let map = L.map('map').setView([40.69458878, -73.97425], 15);

  //Tile layer to add to the map
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  //Let's add a marker icon
  var thunderIcon = L.icon({
    iconUrl: 'icons/thunder.png',

    iconSize: [38, 38], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-7, -90] // point from which the popup should open relative to the iconAnchor
  });
  //Marker itself
  let marker = L.marker([40.693058539694675, -73.98718828116779], { icon: thunderIcon }).addTo(map);
  //Add popup text to the marker
  marker.bindPopup("ITP/IMA, 370 Jay St!").openPopup();
});
