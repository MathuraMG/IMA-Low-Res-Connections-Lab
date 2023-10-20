//Require express
let express = require('express');
let app = express();

//Serve public folder
app.use(express.static('public'));

//Listen
let port = 3000;
app.listen(port, () => {
  console.log('Server listening on localhost:', port);
});

/*Add your routes here */
