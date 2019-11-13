const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mainRouts = require('./routes/main');
const cardRouts = require('./routes/card');
const addRouts = require('./routes/add');
const catalogRouts = require('./routes/catalog');

const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use('/', mainRouts);
app.use('/add', addRouts);
app.use('/catalog', catalogRouts);
app.use('/card', cardRouts);

app.listen(PORT, ()=> {
  console.log(`server is running on PORT ${PORT}...`);
});