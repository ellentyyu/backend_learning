const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Todo = require('./models/todo');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  Todo.find()
  .lean()
  .sort({ _id: 'asc' })
  .then(todos => res.render('index', { todos }))
  .catch(err => console.error(err));
});

app.get('/todos/new', (req, res) => {
  res.render('new');
});

app.post('/todos', (req, res) => {
  const name = req.body.name;
  Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error));

  // 另外一種寫法
  // const todo = new Todo({ name });
  // todo.save()
  //   .then(() => res.redirect('/'))
  //   .catch(error => console.log(error));
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(err => console.error(err));
});

app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id;
  Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(err => console.error(err));
});

app.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  const { name, isDone } = req.body;
  Todo.findById(id)
    .then(todo => {
      todo.name = name;
      todo.isDone = isDone === 'on';
      todo.save();
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(err => console.error(err));
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => {
      console.log('刪除成功');
      res.redirect('/')
    })
    .catch(err => console.error(err));
});

app.listen(3000, () => {
  console.log('app running on http://localhost:3000');
});