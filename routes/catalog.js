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

router.get('/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/');
  } else {
    const sort = await SortOfVino.getById(req.params.id);
    res.render('catalogEdit', {
      title: `Edit`,// ${sort.title}`,
      sort
    });
  };
});

router.post('/edit', async (req, res) => {
  await SortOfVino.update(req.body);
  res.redirect("/catalog");
})

router.get('/:id', async (req, res) => {
  const sort = await SortOfVino.getById(req.params.id);
  res.render('catalogInnerPage', {
    layout: 'empty',
    title: `Sort`,// ${sort.title}`,
    sort
  });
});

module.exports = router;