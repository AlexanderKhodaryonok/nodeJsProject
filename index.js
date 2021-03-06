const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mainRouts = require('./routes/main');
const cardRouts = require('./routes/card');
const addRouts = require('./routes/add');
const catalogRouts = require('./routes/catalog');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();
const PORT = process.env.PORT || 8081;

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(async (req, res, next) => {
  try{
    const user = await User.findById('5dd7aa0adddce6002047d2cd');
    req.user = user;
    next();
  } catch(e) {
    console.log(e);
  };
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

async function start() {
  try {
    const url = 'mongodb+srv://Alexander:zQC2Ik77F5Lgpe8Q@cluster0-s4qji.mongodb.net/shop';
    await mongoose.connect(url, { 
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    app.use('/', mainRouts);
    app.use('/add', addRouts);
    app.use('/catalog', catalogRouts);
    app.use('/card', cardRouts);

    const condidate = await User.findOne();
    if(!condidate) {
      const user = new User({
        email: 'useremail@gmail.com',
        name: 'UserName',
        cart: {items: []}
      });

      await user.save();
    };

    app.listen(PORT, () => {
      console.log(`server is running on PORT ${PORT}...`);
    });
  } catch (e) {
    app.get('/', (req, res) => {
      res.set('Content-Type', 'text/html, charset=utf-8');
      res.send('<h1>Technical problems with this server</h1>');
    })
    
    app.listen(PORT, () => {
      console.log(`server is not running on PORT ${PORT}...`);
    });
  }
};

start();
