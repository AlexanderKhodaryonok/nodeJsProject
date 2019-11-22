const { Router } = require('express');
const SortOfVino = require('../models/sortOfVino');

const router = Router();

router.get('/', async (req, res) => {
  const sorts = await SortOfVino.find().populate('userId', 'email name').select('price title img');
  res.render('catalog', {
    title: 'Catalog',
    isCatalog: true,
    sorts
  });
});

router.get('/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/');
  } else {
    const sort = await SortOfVino.findById(req.params.id);
    res.render('catalogEdit', {
      title: `Edit`,// ${sort.title}`,
      sort
    });
  };
});

router.post('/edit', async (req, res) => {
  const { id } = req.body;
  delete req.body.id;
  await SortOfVino.findByIdAndUpdate(id, req.body);
  res.redirect("/catalog");
})

router.post('/remove', async (req, res) => {
  try{
    await SortOfVino.deleteOne({
      _id: req.body.id
    });
    res.redirect("/catalog");
  } catch(e) {
    console.log(e);
  }
})

router.get('/:id', async (req, res) => {
  const sort = await SortOfVino.findById(req.params.id);
  res.render('catalogInnerPage', {
    layout: 'empty',
    title: `Sort`,// ${sort.title}`,
    sort
  });
});

module.exports = router;