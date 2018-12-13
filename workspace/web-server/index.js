const path = require('path');
const express = require('express');
const app = express();

app.use('/', express.static(path.resolve(__dirname, '../mobile-client/dist')));
app.use('/screen', express.static(path.resolve(__dirname, '../screen-client/dist')));
app.use('/admin', express.static(path.resolve(__dirname, '../admin-client/dist')));

app.listen(3000, function () {
  console.log('listening 3000');
});