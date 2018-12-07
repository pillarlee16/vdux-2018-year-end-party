const mongoose = require('mongoose');

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


  // _User.create({ nickname: 'Hello' });
}

const user = {
  createUser: function () {
    return new Promise((resolve, reject) => {
      if (!_User) reject();
    
      _User.create({
        nickname: '',
        nicknameColor: colors[Math.floor(Math.random() * colors.length)],
        dressVote: -1,
        donation: 20000,
      }, function (err, user) {
        if (err) reject(err);
        resolve(user);
      });
    });
  },
  findById: function (id) {
    return new Promise((resolve, reject) => {
      if (!_User) reject();
    
      _User.findOne({ _id: id }, function (err, raw) {
        if (err) reject(err);
        resolve(raw);
      });
    });
  },
  findByNickname: function (nickname) {
    return new Promise((resolve, reject) => {
      if (!_User) reject();
  
      _User.find({ nickname }, function (err, raw) {
        if (err) reject(err);
        resolve(raw);
      });
    });
  },
  updateById: function (id, param) {
    return new Promise((resolve, reject) => {
      if (!_User) reject();
  
      _User.updateOne({ _id: id }, param, null, function (err, raw) {
        if (err) reject(err);
        resolve(raw);
      });
    });
  },
};

const candidate = {
  createCandidate: function () {
    return new Promise((resolve, reject) => {
      if (!_Candidate) reject();
    
      _Candidate.create({
        name: '',
        imageUrl: '',
        enabled: true,
        like: 0,
        vote: 0,
      }, function (err, user) {
        if (err) reject(err);
        resolve(user);
      });
    });
  },
  updateById: function (id, param) {
    return new Promise((resolve, reject) => {
      if (!_Candidate) reject();
  
      _Candidate.updateOne({ _id: id }, param, null, function (err, raw) {
        if (err) reject(err);
        resolve(raw);
      });
    });
  },
  getAll: function () {
    return new Promise((resolve, reject) => {
      if (!_Candidate) reject();

      _Candidate.find(null, null, null, function (err, raw) {
        if (err) reject(err);
        resolve(raw);
      });
    });
  },
  delete: function (id) {
    return new Promise((resolve, reject) => {
      if (!_Candidate) reject();

      _Candidate.deleteOne({ _id: id }, function (err, raw) {
        if (err) reject(err);
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
