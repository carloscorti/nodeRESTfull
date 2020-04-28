/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const debug = require('debug')('app:bookRouter.controller');
const { url, dbName } = require('../services/conection.service');
const Book = require('../models/bookModel');

function bookRouterController() {
  mongoose.connect(`${url}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });

  function getAllBooks(req, res) {
    const { query } = req;
    Book.find(query, (err, result) => {
      if (err) {
        debug(err);
        return res.send(err);
      }
      return res.json(result);
    });
  }

  function getBookById(req, res) {
    const { id } = req.params;
    Book.findById(id, (err, book) => {
      if (err) {
        debug(err);
        return res.send(err);
      }
      return res.json(book);
    });
  }

  function postBook(req, res) {
    // le doy le Schema mongoose
    const book = new Book(req.body);

    // asi hace db.callection.insertOne mongoose
    book.save();
    return res.status(201).json(book);
  }

  function putBook(req, res) {
    const { id } = req.params;
    Book.findById(id, (err, book) => {
      if (err) {
        debug(err);
        return res.send(err);
      }
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;

      book.save();

      return res.json(book);
    });
  }

  return {
    getAllBooks,
    getBookById,
    postBook,
    putBook,
  };
}

module.exports = bookRouterController;
