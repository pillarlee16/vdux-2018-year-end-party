const express = require('express');
const app = express();
const cors = require('cors');
const port = 3006;
const DB = require('../db/index.js');

app.use(cors());
app.use(express.json());

const PREFIX = '[SERVER/API]';

/***************************
 * 
 * USER
 * 
 ***************************/

app.get('/api/user/:id', function (req, res) {
  DB.user.findOne(req.params.id)
    .then(user => { res.send(user); })
    .catch(error => { res.send({ error }); });
})

app.put('/api/user', function (req, res) {
  DB.user.create()
    .then(user => { res.send(user); });
})

app.put('/api/user/:id', function (req, res) {
  const id = req.params.id;
  const props = req.body;

  DB.user.update(id, props)
    .then(user => { res.send(user); })
    .catch(error => { res.send({ error }); });
});


/***************************
 * 
 * CANDIDATE
 * 
 ***************************/


app.get('/api/candidate', function (req, res) {
  DB.candidate.findAll()
    .then(result => { res.send(result); })
    .catch(error => { res.send({ error }); });
});

app.put('/api/candidate', function (req, res) {
  DB.candidate.create()
    .then(result => { res.send(result); })
    .catch(error => { res.send({ error }); });
});

app.put('/api/candidate:id', function (req, res) {
  const id = req.params.id;
  const props = req.body;

  DB.candidate.update(id, props)
    .then(result => { res.send(result); })
    .catch(error => { res.send({ error }); });
});

app.delete('/api/candidate/:id', function (req, res) {
  const id = req.params.id;

  console.log(PREFIX, '/api/candidate/:id', id);

  DB.candidate.delete(id)
    .then(result => {
      console.log(PREFIX, '/api/candidate/:id', 'then', result);
      res.send({ _id: id, ...result });
    })
    .catch(error => {
      console.log(PREFIX, '/api/candidate/:id', 'catch', error);
      res.send({ error });
    });
});

app.listen(port, function() {
  console.log('chat-server api is listening ', port);
});
