const express = require('express');
const router = express.Router();
const Todo = require('../../models/todo');

router.get('/new', (req, res) => {
  res.render('new');
});

router.post('', (req, res) => {
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

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(err => console.error(err));
});

router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(err => console.error(err));
});

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => {
      console.log('刪除成功');
      res.redirect('/')
    })
    .catch(err => console.error(err));
});

module.exports = router;