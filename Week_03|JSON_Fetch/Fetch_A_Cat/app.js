window.addEventListener('load', () => {
    const catButton = document.querySelector('#catButton');
    const catImage = document.querySelector('#catImage');

    catButton.addEventListener('click', () => {
        fetch('https://api.thecatapi.com/v1/images/search')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const imageUrl = data[0].url;
                catImage.src = imageUrl;
            })
            .catch(error => {
                console.error("Error fetching cat image:", error);
            });
    });
});
