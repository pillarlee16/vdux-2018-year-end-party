const express = require('express');
const app = express();
const cors = require('cors');
const port = 3006;
const DB = require('../db/index.js');

app.use(cors());
app.use(express.json());


app.get('/api/user/:id', function (req, res) {
  DB.user.findById(req.params.id)
  .then(user => {
    res.send(user);
  })
  .catch(err => {
    res.send({ error: 'Cannot Find That User.' });
  });
})

app.put('/api/user', function (req, res) {
  DB.user.createUser().then(user => {
    res.send(user);
  });
})

app.put('/api/user/:id', function (req, res) {
  const id = req.params.id;
  const props = req.body;

  DB.user.updateById(id, props)
    .then(user => {
      console.log('success', user)
      res.send(user);
    })
    .catch(err => {
      console.log('fail', err)
      res.send({ error: 'Cannot Find That User.' });
    });
  console.log(id, props);
});


// app.get('/api/candidate', function (req, res) {
//   DB.candidate.getAll()
//     .then(result => {
//       console.log('/api/candidate', 'success', result);
//       res.send(result);
//     })
//     .catch(err => {
//       console.log('/api/candidate', 'fail', err);
//       res.send({ error: err });
//     });
// });

app.get('/api/candidate', function (req, res) {
  DB.candidate.getAll()
    .then(result => {
      console.log('/api/candidate', 'success', result);
      res.send(result);
    })
    .catch(err => {
      console.log('/api/candidate', 'fail', err);
      res.send({ error: err });
    });
});

app.get('/api/candidate/create', function (req, res) {
  DB.candidate.createCandidate()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send({ error: err });
    });
});

app.delete('/api/candidate/:id', function (req, res) {
  console.log('server delete', req.params.id);
  DB.candidate.delete(req.params.id)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send({ error: err });
    });
});

app.listen(port, function() {
  console.log('chat-server api is listening ', port);
});
