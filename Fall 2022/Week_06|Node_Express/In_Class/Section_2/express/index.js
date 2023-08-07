//data
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

//require express
let express = require('express');
// create an app object
let app = express();

//serve static files
app.use('/', express.static('public'));

//routes
app.get('/', (request, response) => {
  response.send('This is the main page');
});

app.get('/about', (request, response)=>{
  response.send('This is an about page');
})

//astronauts
app.get('/astronauts', (request, response)=>{
  response.json(astronauts);
});

//specific data: req.params
app.get('/astronauts/:astronaut', (request, response)=>{
  let astronaut = request.params.astronaut;
  let astronaut_obj;
  // console.log(request.params.astronaut);
  for(let i=0; i<astronauts.data.length; i++){
    if(astronaut === astronauts.data[i].key){
      astronaut_obj = astronauts.data[i];
    }
  }
  console.log(astronaut_obj);

  if(astronaut_obj){
    response.json(astronaut_obj);
  }else{
    response.json({status: "Data does not exist"});
  }
});

//tell which port to listen on
app.listen(3000, () =>{
  console.log('The app is listening on localhost:3000')
});
