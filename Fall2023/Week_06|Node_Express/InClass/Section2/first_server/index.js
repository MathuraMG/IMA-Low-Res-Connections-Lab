console.log('My first server side file');

//Data to send to the client side
let astronauts = {
  "data": [
    {
      "key": "lindgren",
      "name": "Kjell Lindgren",
      "craft": "ISS",
      "wikipedia": "https://en.wikipedia.org/wiki/Kjell_N._Lindgren"
    },
    {
      "key": "hines",
      "name": "Bob Hines",
      "craft": "ISS",
      "wikipedia": "https://en.wikipedia.org/wiki/Robert_Hines_(astronaut)"
    },
    {
      "key": "yang",
      "name": "Liu Yang",
      "craft": "Tiangong",
      "wikipedia": "https://en.wikipedia.org/wiki/Liu_Yang_(taikonaut)"
      }
  ]
}

//Step 5. Require express
let express = require('express');
//Step 6. Create an app object
let app = express();

//Step 12. Serve static files
app.use('/', express.static('public'));

//Step 7. Create the first route
// app.get('/', (request, response) => {
//   response.send("This is the main page");
// });

//Step 9. Additional routes
app.get('/about', (request, response) => {
  response.send('This is an About page');
});

app.get('/astronauts', (request, response) => {
  // response.send('This is an Astronaut page');
  //Step 10. Send back some data
  response.json(astronauts);
});

//Step 11. Send specific data
app.get('/astronauts/:astronaut', (request, response) => {
  // console.log(request.params);
  let astronaut = request.params.astronaut;
  let astronaut_obj; // will hold the value that we'll send back to the client
  for(let i=0; i<astronauts.data.length; i++){
    if(astronaut === astronauts.data[i].key){
      astronaut_obj = astronauts.data[i];
    }
  }
  // console.log(astronaut_obj);

  //check if the data exists
  if(astronaut_obj){
    //send back the specific object to the client side
    response.json(astronaut_obj);
  }else{
    response.json({"status": "Data doesn't exist"});
  }

});

//Step 8. Tell which port to listen on
app.listen(3000, () =>{
  console.log('The app is listening on localhost:3000');
});
