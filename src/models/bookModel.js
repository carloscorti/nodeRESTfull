const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookModel = new Schema(
  {
    title: { type: String, default: ''},
    author: { type: String, default: '' },
    genre: { type: String, default: '' },
    read: { type: Boolean, default: false },
  }
);

// asi se define el modelo para usar
module.exports = mongoose.model('Book', bookModel);
