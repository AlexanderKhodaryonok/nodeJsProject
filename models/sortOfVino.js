const { Schema, model } = require('mongoose');

const sortOfVino = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: String
});

module.exports = model('SortOfVino', sortOfVino)