window.addEventListener('load', function() {
    const adviceText = document.getElementById('adviceText');

    fetch('https://api.adviceslip.com/advice')
        .then(response => response.json())
        .then(data => {
            const advice = data.slip.advice;
            adviceText.textContent = advice;
        })
        .catch(error => {
            console.error("Error fetching advice:", error);
            adviceText.textContent = "Could not load advice. Please try again later.";
        });
});
