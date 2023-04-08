// 載入 mongoose 和 todo model
const mongoose = require('mongoose');
const Todo = require('../todo');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }); // 連線到 DB

// 連線狀態
const db = mongoose.connection;
db.on('error', () => {
  console.log('mongodb error!');
});

db.once('open', () => {
  console.log('mongodb connected!');
  for (let i = 0; i < 10; i++) {
    Todo.create({name: `name-${i}`});
  }
  console.log('done');
});