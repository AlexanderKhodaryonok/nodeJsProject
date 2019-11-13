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
  const sortOfVino = new SortOfVino(req.body.title, req.body.price, req.body.img);
  await sortOfVino.save();
  res.redirect('/catalog');
})

module.exports = router;