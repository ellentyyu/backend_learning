const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const routes = require('./routes');
const usePassport = require('./config/passport');
require('./config/mongoose');

const app = express();

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
// 這要寫在路由前
usePassport(app);
app.use(routes);

app.listen(3000, () => {
  console.log('app running on http://localhost:3000');
});