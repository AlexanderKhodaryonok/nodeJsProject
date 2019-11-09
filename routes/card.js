const { Router } = require('express');
const router = Router();
const Card = require('../models/card');
const SortOfVino = require('../models/SortOfVino');

router.post('/add', async (req, res) => {
    const sort = await SortOfVino.getById(req.body.id);
    await Card.add(sort);
    res.redirect('/card');
});

router.get('/', async (req, res) => {
    const card = await Card.fetch();
    res.render('card', {
        title: 'Basket',
        isCard: true,
        sorts: card.sorts,
        price: card.price
    })
})

module.exports = router;