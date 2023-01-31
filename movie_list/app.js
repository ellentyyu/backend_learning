const express = require('express');
const exphbs = require('express-handlebars');
const movieList = require('./movies.json');

const app = express();
const port = 3000;

// 設定樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// 靜態檔案
app.use(express.static('public'));

// 路由
app.get('/', (req, res) => {
  res.render('index', { movies: movieList.results });
});

app.get('/search', (req, res) => {
  const movies = movieList.results.filter(item => item.title.toLowerCase().includes(req.query.keyword.toLowerCase()));
  res.render('index', { movies: movies, keyword: req.query.keyword });
});

app.get('/movies/:id', (req, res) => {
  const movieData = movieList.results.find(item => item.id == req.params.id);
  res.render('show', { movie: movieData });
});

app.listen(port,  () => {
  console.log(`express running on http://localhost:${port}`);
});