const { Router } = require('express');
const SortOfVino = require('../models/sortOfVino');

const router = Router();

router.get('/', (req, res) => {
  res.render('add', {
    title: 'Add vino',
    isAdd: true
  });
});

router.post('/', async (req, res) => {
  const sortOfVino = new SortOfVino({
    title: req.body.title,
    price: req.body.price,
    img: req.body.img,
    userId: req.user._id
  });
  try{
    await sortOfVino.save();
    res.redirect('/catalog');
  } catch (e) {
    console.log(e);
  }
})

module.exports = router;