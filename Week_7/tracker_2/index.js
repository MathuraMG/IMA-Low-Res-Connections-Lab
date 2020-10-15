const express= require('express');
const app = express();
const Datastore = require('nedb');


let bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('/', express.static('public'));


const database = new Datastore('database.db');
database.loadDatabase();
app.post('/activity', (req, res)=> {
  database.insert({task:req.body.data});
  console.log(activities);
  res.send({task: "success"});
})

app.get('/activities', (req,res)=> {
  let activities = [];
  database.find({}, function (err, docs) {
    for(let i=0;i<docs.length;i++) {
      activities.push(docs[i].task);
    }
    res.json({activities: activities});
  });
})



app.listen(8000, ()=> {
  console.log('server on localhost:8000');
})
