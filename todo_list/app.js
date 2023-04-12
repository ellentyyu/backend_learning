// 載入 Express.js
const express = require('express');
// 載入樣板引擎
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
// 載入 Todo model
const Todo = require('./models/todo');
// 載入 mongoose
const mongoose = require('mongoose');
// 僅在非正式環境時 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }); // 設定連線到 DB

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 樣板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }));

// 設定首頁路由
app.get('/', (req, res) => {
  Todo.find()
  .lean()
  .then(todos => res.render('index', { todos }))
  .catch(err => console.error(err));
});

app.get('/todos/new', (req, res) => {
  res.render('new');
});

app.post('/todos', (req, res) => {
  const name = req.body.name;       // 從 req.body 拿出表單裡的 name 資料
  // Todo.create({ name })       // 存入資料庫
  //   .then(() => res.redirect('/')) // 新增完成後導回首頁
  //   .catch(error => console.log(error));

  // 另外一種寫法
  const todo = new Todo({ name });
  todo.save()
    .then(() => res.redirect('/'))
    .catch(error => console.log(error));
});


// 設定 port 3000
app.listen(3000, () => {
  console.log('app running on http://localhost:3000');
});