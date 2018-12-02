const express = require('express');
const app = express();
const cors = require('cors');
const port = 3006;
const DB = require('../db/index.js');

app.use(cors());
app.use(express.json());

// app.get('/api/user', function (req, res) {
//   DB.createUser().then(user => {
//     // console.log(user);
//     res.send(user);
//   });
// });


app.get('/api/user', function (req, res) {
  DB.createUser().then(user => {
    res.send(user);
  });
})

app.get('/api/user/:id', function (req, res) {
  DB.findById(req.params.id)
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.send({ error: 'Cannot Find That User.' });
    });
})

app.put('/api/user', function (req, res) {
  const param = req.body;
  const id = param._id;

  delete param._id;

  DB.updateById(id, param)
    .then(user => {
      console.log('success', user)
      res.send(user);
    })
    .catch(err => {
      console.log('fail', err)
      res.send({ error: 'Cannot Find That User.' });
    });
  console.log(id, param);
});


app.listen(port, function() {
  console.log('chat-server api is listening ', port);
});
