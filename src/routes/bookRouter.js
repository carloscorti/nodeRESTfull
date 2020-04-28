const express = require('express');
// const debug = require('debug')('app:bookRouter');
const { getAllBooks, getBookById, postBook } = require('../controllers/bookRouter.controller')();


function bookApi() {
  const bookRouter = express.Router();
  bookRouter.route('/books')
    .get(getAllBooks)
    .post(postBook);

  bookRouter.route('/book/:id')
    .get(getBookById);

  return bookRouter;
}

module.exports = bookApi;
