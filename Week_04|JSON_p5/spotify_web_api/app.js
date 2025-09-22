console.log("page is loading.");

/**
 * Spotify Web API Authentication and Data Retrieval Example
 * 
 * It takes three steps:
 * 1. Obtain access token from the Spotify API to use their services. It requires a registered application on Spotify Developer Dashboard and obtaining the Client ID and Client Secret.
 * 2. Use the obtained access token to make requests to the Spotify Web API.
 * 3. Retrieve data from the Spotify Web API and display it in the console or a web page.
 */


// Step 1: Obtain access token
// To get get a token, you'd need a client_id and client_secret. To get these, you need to register an app on Spotify Developer Dashboard
// You can find your credentials inside the Settings of your app
// Follow instructions here: https://developer.spotify.com/documentation/web-api/tutorials/getting-started, then put your credentials below
let client_id = 'xxx'; // Replace with your actual client_id
let client_secret = 'xxx'; // Replace with your actual client_secret
let access_token;

let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret), 
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
};

window.addEventListener("load", () => {
    console.log("page is loaded.");

    fetch(authOptions.url, {
        method: 'POST',
        headers: authOptions.headers,
        body: authOptions.body
    })
    .then(response => {
        return response.json();
    })
    .then(data => {

        // save the token
        access_token = data.access_token;
        console.log("Access Token:", access_token);
    })
    .catch(function (error) {
        console.error('Error:', error);
    });

    // Event listener for search button
    document.getElementById('search-button').addEventListener('click', searchSpotify);
});


function searchSpotify() {

    // Step 2. Make a request to the Spotify Web API using the token
    
    // First we get the value of the input field
    let query = document.getElementById('search-input').value;

    // Then we make a call to the search endpoint (https://api.spotify.com/v1/search) to find an artist
    // We're taking the input as the query, and adding two params: type=artist and limit=1.
    // Look up the documentation (https://developer.spotify.com/documentation/web-api) to find the endpoint you need, and replace with your actual search query.
    let url = 'https://api.spotify.com/v1/search?q=' + encodeURIComponent(query) + '&type=artist&limit=1'; 
    
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    })
    .then(response => response.json())
    .then(data => {

        // Step 3. Do something with the retrieved data
        console.log("Search Results:", data);
    })
    .catch(error => console.error('Error:', error));
}


// Below is an example of the returned JSON object from a search query of "Taylor Swift":
// {
//     "artists": {
//         "href": "https://api.spotify.com/v1/search?query=taylor+swift&type=artist&locale=en-US%2Cen%3Bq%3D0.9%2Czh-CN%3Bq%3D0.8%2Czh-TW%3Bq%3D0.7%2Czh%3Bq%3D0.6&offset=0&limit=1",
//         "items": [
//             {
//                 "external_urls": {
//                     "spotify": "https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02"
//                 },
//                 "followers": {
//                     "href": null,
//                     "total": 122109975
//                 },
//                 "genres": [
//                     "pop"
//                 ],
//                 "href": "https://api.spotify.com/v1/artists/06HL4z0CvFAxyc27GXpf02",
//                 "id": "06HL4z0CvFAxyc27GXpf02",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
//                         "width": 640
//                     },
//                     {
//                         "height": 320,
//                         "url": "https://i.scdn.co/image/ab67616100005174e672b5f553298dcdccb0e676",
//                         "width": 320
//                     },
//                     {
//                         "height": 160,
//                         "url": "https://i.scdn.co/image/ab6761610000f178e672b5f553298dcdccb0e676",
//                         "width": 160
//                     }
//                 ],
//                 "name": "Taylor Swift",
//                 "popularity": 100,
//                 "type": "artist",
//                 "uri": "spotify:artist:06HL4z0CvFAxyc27GXpf02"
//             }
//         ],
//         "limit": 1,
//         "next": "https://api.spotify.com/v1/search?query=taylor+swift&type=artist&locale=en-US%2Cen%3Bq%3D0.9%2Czh-CN%3Bq%3D0.8%2Czh-TW%3Bq%3D0.7%2Czh%3Bq%3D0.6&offset=1&limit=1",
//         "offset": 0,
//         "previous": null,
//         "total": 830
//     }
// }