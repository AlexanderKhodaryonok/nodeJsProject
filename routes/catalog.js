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

module.exports = router;