const express = require('express');
const debug = require('debug')('app:bookRouter');
// const { mongoGet } = require('../services/mongoQuery.service')();
const { getAllBooks, getBookById } = require('../controllers/bookRouter.controller')();

function bookApi() {
  const bookRouter = express.Router();
  bookRouter.route('/book')
    .get(getAllBooks);

  bookRouter.route('/book/:id')
    .get(getBookById);

  return bookRouter;
}

module.exports = bookApi;
