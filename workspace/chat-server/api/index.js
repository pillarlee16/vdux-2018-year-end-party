const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const uuidv1 = require('uuid/v1');
const port = 3006;
const DB = require('../db/index.js');

app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.resolve(__dirname, '../static')));

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
    .then(result => {
      DB.user.findOne(id).then(user => {
        res.send(user);
      });
    })
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

app.put('/api/candidate/:id', function (req, res) {
  const id = req.params.id;
  const props = req.body;

  DB.candidate.update(id, props)
    .then(result => {
      DB.candidate.findOne(id).then(candidate => {
        res.send(candidate);
      });
    })
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


/***************************
 * 
 * UPLOAD
 * 
 ***************************/

const UPDATE_DIR = path.resolve(__dirname, '../static');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPDATE_DIR);
  },
  filename: function(req, file, cb) {
    const filename = file.originalname;
    const tokens = filename.split('.');
    const ext = (tokens.length >= 2) ? tokens[tokens.length - 1] : '';
 
    cb(null, `${uuidv1()}.${ext}`);
  }
});
const upload = multer({ storage }).array('upname', 20);

app.post('/api/upload', function (req, res) {
  upload(req, res, function (error) {
    if (error) {
      res.send({ error });
      return;
    }

    const file = req.files[0];
    const filename = file.filename;
    const url = `http://localhost:3006/static/${file.filename}`;

    res.send({ url, filename });
  });
});


app.listen(port, function() {
  console.log('chat-server api is listening ', port);
});
