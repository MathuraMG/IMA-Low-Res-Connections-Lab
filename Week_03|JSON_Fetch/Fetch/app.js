window.addEventListener('load', function() {
    console.log('page is loaded');
    
    /*
    fetch('http://api.open-notify.org/astros.json')
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        //do something
        console.log(data.number);
    })
    */

   fetch('http://api.open-notify.org/astros.json')
   .then(response => response.json())
   .then(data => {
        //do something
       console.log(data.number);
   })
   .catch(error => {
       console.log("Error!!! : " + error);
   })

})


/*

//rewriting anonymous function - fat arrow syntax

function(a) {
    return a+10;
}

// 1. Remove the word function, replace with arrow =>
(a) => {
    return a+10;
}

//2. Remove the Brackets if there is ONLY one argument
a => return a+10;

//3. Remove "retun" if that's the only thing happening in the function
a =>  a+10;

*/