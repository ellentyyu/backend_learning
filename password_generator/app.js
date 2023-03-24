const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port = 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
})

app.post('/', (req, res) => {
  res.render('index');
})

app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`)
});