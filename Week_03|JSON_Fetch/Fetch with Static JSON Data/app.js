window.addEventListener('load', function() {
    
    console.log('page is loaded');

   //Load the json data file 
   fetch('moods.json')
   .then(response => response.json())
   .then(data => {
        console.log(data);
        //Do something with 'data'

   })
   .catch(error => {
       console.log("Error!!! : " + error);
   })

})