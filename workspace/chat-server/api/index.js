const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const uuidv1 = require('uuid/v1');
const config = require('../config.js');

const port = config.API_PORT;
const DB = require('../db/index.js');
const EventEmitter = require('events');

app.use(cors());
app.use(express.json());


const PREFIX = '[SERVER/API]';

const $event = new EventEmitter();

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


const MAX_VOTES = 3;

app.put('/api/user/vote/:userId/', function (req, res) {
  const userId = req.params.userId;
  const candidateId = req.body.candidateId;

  (async function () {
    let user = await DB.user.findOne(userId);
    let candidate = await DB.candidate.findOne(candidateId);
    let code = 'NOTHING';

    let votes = user.votes;
    const idx = votes.indexOf(candidateId);
    if (idx < 0) {     // VOTE
      if (votes.length < MAX_VOTES) {
        // VOTE
        votes.push(candidateId);
        await DB.user.update(userId, { votes });
        await DB.candidate.update(candidateId, { vote: candidate.vote + 1 });
        user = await DB.user.findOne(userId);
        candidate = await DB.candidate.findOne(candidateId);
        code = 'VOTE';

        $event.emit('vote', { candidateId });
      } else {
        code = 'EXCEED';
      }
    } else {                                  // UNVOTE
      // UNVOTE
      votes.splice(idx, 1);
      console.log('UNVOTE', 'votes', idx, votes);
      await DB.user.update(userId, { votes });
      await DB.candidate.update(candidateId, { vote: candidate.vote - 1 });
      user = await DB.user.findOne(userId);
      candidate = await DB.candidate.findOne(candidateId);
      code = 'UNVOTE';
    }

    res.send({ user, candidate, code });
  })();
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

app.put('/api/candidate/like/:id', function (req, res) {
  const id = req.params.id;

  (async function () {
    const curr = await DB.candidate.findOne(id);
    await DB.candidate.update(id, { like: curr.like + 1 });
    const next = await DB.candidate.findOne(id);

    $event.emit('like', { candidateId: id });

    res.send(next);
  })();
});

/***************************
 * 
 * UPLOAD
 * 
 ***************************/

const UPDATE_DIR = path.resolve(__dirname, '../../../resources');

app.use('/resources', express.static(UPDATE_DIR));

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
    const url = `${config.API_SERVICE_URL}/resources/${file.filename}`;

    res.send({ url, filename });
  });
});


app.listen(port, function() {
  console.log('chat-server api is listening ', port);
});

module.exports = {
  $event,
}