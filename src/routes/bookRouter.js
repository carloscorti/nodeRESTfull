const express = require('express');
// const debug = require('debug')('app:bookRouter');
const Book = require('../models/bookModel');
const { url, dbName } = require('../services/conection.service');
const { getAllBooks, searchBookById, getBookById, postBook, putBook, patchBook } = require('../controllers/bookRouter.controller')(Book, url, dbName);


function bookApi() {
  const bookRouter = express.Router();
  bookRouter.route('/books')
    .get(getAllBooks)
    .post(postBook);

  bookRouter.use('/book/:id', searchBookById);
  bookRouter.route('/book/:id')
    .get(getBookById)
    .put(putBook)
    .patch(patchBook);

  return bookRouter;
}

module.exports = bookApi;
