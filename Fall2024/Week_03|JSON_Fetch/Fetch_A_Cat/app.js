window.addEventListener('load', function() {
    const catButton = document.getElementById('catButton');
    const catImage = document.getElementById('catImage');

    catButton.addEventListener('click', function() {
        fetch('https://api.thecatapi.com/v1/images/search')
            .then(response => response.json())
            .then(data => {
                const imageUrl = data[0].url;
                catImage.src = imageUrl;
            })
            .catch(error => {
                console.error("Error fetching cat image:", error);
            });
    });
});