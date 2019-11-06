const { Router } = require('express');
const SortOfVino = require('../models/sortOfVino');

const router = Router();

router.get('/', async (req, res) => {
  const sorts = await SortOfVino.getAll(); 
  res.render('catalog', {
    title: 'Catalog',
    isCatalog: true,
    sorts
  });
});

router.get('/:id', async (req, res) => {
  const sort = await SortOfVino.getById(req.params.id);
  console.log(sort.title);
  res.render('catalogInnerPage', {
    layout: 'empty',
    title: `Sort ${sort.title}`,
    sort
  });
});

module.exports = router;