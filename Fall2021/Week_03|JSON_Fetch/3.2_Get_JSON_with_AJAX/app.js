window.addEventListener('load', function() {
    console.log('page is loaded');
    $.getJSON('http://api.open-notify.org/astros.json', function(data) {
        console.log("Number of people in space : " + data.number);
    })
})