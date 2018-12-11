const mongoose = require('mongoose');


const PREFIX = '[DB]'

const colors = [ 'red', 'pink', 'purple', 'deeppurple', 'indigo', 'blue', 'lightblue', 'cyan', 'teal', 'green', 'lightgreen', 'lime', 'yellow', 'amber', 'orange', 'deeporange' ];

let _db = null;
let _User = null;
let _Candidate = null;

function connect() {
  return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://localhost/test');
  
    const db = mongoose.connection;
    db.on('error', function () {
      reject('connection error');
    })
    db.once('open', function() {
      console.log('mongodb is connected');
      
      _db = db;
      initScheme();

      resolve();
    });
  });
}

function initScheme() {
  if (!_db) return;

  const userSchema = new mongoose.Schema({
    nickname: String,
    nicknameColor: String,
    dressVote: Number,
    donation: Number,
    votes: [String],
  });

  const candidateSchema = new mongoose.Schema({
    index: Number,
    name: String,
    imageUrl: String,
    enabled: Boolean,
    like: Number,
    vote: Number,
  });
  
  _User = mongoose.model('User', userSchema);
  _Candidate = mongoose.model('Candidate', candidateSchema);
}

const user = {
  create: function () {
    return new Promise((resolve, reject) => {
      if (!_User) reject();
    
      _User.create({
        nickname: '',
        nicknameColor: colors[Math.floor(Math.random() * colors.length)],
        dressVote: -1,
        donation: 20000,
      }, function (err, user) {
        if (err) {
          reject(err);
          return;
        }
        resolve(user);
      });
    });
  },
  findOne: function (_id) {
    return new Promise((resolve, reject) => {
      if (!_User) reject();
    
      console.log(PREFIX, 'user.findOne invoked', _id);
      _User.findById(_id, function (err, raw) {
        console.log(PREFIX, 'user.findOne callback', _id, err, raw);
        if (err) {
          reject(err);
          return;
        }
        if (!raw) {
          reject(`Cannot find "${_id}" user`);
          return;
        }

        resolve(raw);
      });
    });
  },
  update: function (_id, props) {
    return new Promise((resolve, reject) => {
      if (!_User) reject();
  
      _User.updateOne({ _id }, props, null, function (err, raw) {
        if (err) {
          reject(err);
          return;
        }
        resolve(raw);
      });
    });
  },
};

const candidate = {
  create: function () {
    return new Promise((resolve, reject) => {
      if (!_Candidate) reject();
    
      _Candidate.create({
        name: '',
        imageUrl: '',
        enabled: true,
        like: 0,
        vote: 0,
      }, function (err, user) {
        if (err) {
          reject(err);
          return;
        }
        resolve(user);
      });
    });
  },
  update: function (_id, props) {
    return new Promise((resolve, reject) => {
      if (!_Candidate) reject();
  
      _Candidate.updateOne({ _id }, props, null, function (err, raw) {
        if (err) {
          reject(err);
          return;
        }
        resolve(raw);
      });
    });
  },
  findOne: function (_id) {
    return new Promise((resolve, reject) => {
      if (!_Candidate) reject();
    
      _Candidate.findById(_id, function (err, raw) {
        if (err) {
          reject(err);
          return;
        }
        if (!raw) {
          reject(`Cannot find "${_id}" candidate`);
        }
        resolve(raw);
      });
    });
  },
  findAll: function () {
    return new Promise((resolve, reject) => {
      if (!_Candidate) reject();

      _Candidate.find(null, null, null, function (err, raw) {
        if (err) {
          reject(err);
          return;
        }
        resolve(raw);
      });
    });
  },
  delete: function (_id) {
    return new Promise((resolve, reject) => {
      if (!_Candidate) reject();

      _Candidate.deleteOne({ _id }, function (err, raw) {
        if (err) {
          reject(err);
          return;
        }
        resolve(raw);
      });
    });
  },
};

module.exports = {
  connect,
  user,
  candidate,
};
