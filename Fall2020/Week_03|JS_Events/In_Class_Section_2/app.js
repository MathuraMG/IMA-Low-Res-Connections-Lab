window.addEventListener('load', function() {
    console.log('page is loaded');


    // fetch('http://api.open-notify.org/astros.json')
    // .then(function(response) {
    //     return response.json()
    // })
    // .then(function(data) {
    //     console.log(data);
    // });

    fetch('http://api.open-notify.org/astros.json')
    .then(response => response.json())
    .then(data => console.log(data));



})


// function(a) {
//     return a+10;
// }

// (a) => {
//     return a+10;
// }

// (a) => {
//      a+10;
// }

// a => a+10




