console.log("Logging from the clientside js file!!!");

fetch('/data')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });