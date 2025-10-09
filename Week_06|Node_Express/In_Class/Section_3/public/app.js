console.log("Logging from client-side js file!!!");

fetch('/data')
.then(response => response.json())
.then(data => {
    console.log(data);
})