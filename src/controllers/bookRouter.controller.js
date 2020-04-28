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
    Book.findById(id, (err, result) => {
      if (err) {
        debug(err);
        return res.send(err);
      }
      return res.json(result);
    });
  }

  return {
    getAllBooks,
    getBookById,
  };
}

module.exports = bookRouterController;
