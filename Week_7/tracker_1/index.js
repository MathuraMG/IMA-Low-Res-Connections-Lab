const express= require('express');
const app = express();
let activities = [];

let bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('/', express.static('public'));

app.post('/activity', (req, res)=> {
  activities.push(req.body.data);
  console.log(activities);
  res.send({task: "success"});
})

app.get('/activities', (req,res)=> {
  res.json({activities: activities});
})



app.listen(8000, ()=> {
  console.log('server on localhost:8000');
})
