const mongoose = require('mongoose');

const colors = [ 'red', 'pink', 'purple', 'deeppurple', 'indigo', 'blue', 'lightblue', 'cyan', 'teal', 'green', 'lightgreen', 'lime', 'yellow', 'amber', 'orange', 'deeporange' ];

let _db = null;
let _User = null;

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
  
  _User = mongoose.model('User', userSchema);


  _User.create({ nickname: 'Hello' });
}

function createUser() {
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
}

function findById(id) {
  return new Promise((resolve, reject) => {
    if (!_User) reject();

    _User.findOne({ _id: id }, function (err, raw) {
      if (err) reject(err);
      resolve(raw);
    });
  });
}

function findByNickname(nickname) {
  return new Promise((resolve, reject) => {
    if (!_User) reject();

    _User.find({ nickname }, function (err, raw) {
      if (err) reject(err);
      resolve(raw);
    });
  });
}

function updateById(id, param) {
  return new Promise((resolve, reject) => {
    if (!_User) reject();

    _User.updateOne({ _id: id }, param, null, function (err, raw) {
      if (err) reject(err);
      resolve(raw);
    });
  });
}

// mongoose.connect('mongodb://localhost/test');

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('mongodb is connected');
//   // we're connected!

//   const User = mongoose.model('User', userSchema);

//   // User.find()


//   // const kittySchema = new mongoose.Schema({ name: String });
//   // kittySchema.methods.speak = function () {
//   //   const greeting = this.name ? `Meow name is ${this.name}` : 'I dont have a name';
//   //   console.log(greeting);
//   // };
//   // // console.log(kittySchema);

//   // const Kitten = mongoose.model('Kitten', kittySchema);

//   // const silence = new Kitten({ name: 'Silence' });
//   // const flutty = new Kitten({ name: 'fluffy' });

//   // console.log(silence.name);
//   // flutty.speak();


//   // flutty.save(function (err, flutty) {
//   //   if (err) return console.error(err);
//   //   flutty.speak();
//   // });

//   // Kitten.find({ name: /^fluff/ }, function (a, b) { console.log(a, b) });
//   // Kitten.find({ _id: '5c0388c84a016e4ac6e22858' }, function (a, b) {
//   //   console.log(a, b)
//   //   console.log(b.name);
//   //   b.speak();
//   // });

// });

module.exports = {
  connect,
  createUser,
  findById,
  findByNickname,
  updateById,
};
