/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const debug = require('debug')('app:bookRouter.controller');

function bookRouterController(Book, url, dbName) {
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

  function searchBookById(req, res, next) {
    const { id } = req.params;
    Book.findById(id, (err, book) => {
      if (err) {
        debug(`Middleware error: ${err}`);
        return res.sendStatus(404);
      }
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  }

  function getBookById(req, res) {
    return res.json(req.book);
  }

  function postBook(req, res) {
    if (req.body._id || !req.body.title) {
      return res.status(400).send('Bad post request schema');
    }
    const book = new Book(req.body);
    return book.save((err, postedBook) => {
      if (err) {
        debug(err);
        return res.sendStatus(400);
      }
      return res.status(201).json(postedBook);
    });
  }

  function putBook(req, res) {
    let badRequest = false;
    const dbFields = Object.keys(req.book.toJSON()).filter((key) => key[0] !== '_');
    const putFields = Object.keys(req.body);

    if (dbFields.length === putFields.length) {
      putFields.forEach((key) => {
        if (dbFields.includes(key)) {
          req.book[key] = req.body[key];
        } else {
          badRequest = true;
        }
      });
    } else {
      badRequest = true;
    }

    if (badRequest) {
      return res.status(400).send('Bad put request schema');
    }
    return req.book.save((err, replaceBook) => {
      if (err) {
        debug(err);
        return res.sendStatus(400);
      }
      return res.status(201).json(replaceBook);
    });
  }

  function patchBook(req, res) {
    if (req.body._id) {
      return res.status(400).send('Bad post request schema');
    }
    const dbFields = Object.keys(req.book.toJSON());
    const putFields = Object.keys(req.body);
    let badRequest = false;

    putFields.forEach((key) => {
      if (dbFields.includes(key)) {
        req.book[key] = req.body[key];
      } else {
        badRequest = true;
      }
    });

    if (badRequest) {
      return res.status(400).send('Bad put request schema');
    }
    return req.book.save((err, patchedBook) => {
      if (err) {
        debug(err);
        return res.sendStatus(400);
      }
      return res.json(patchedBook);
    });
  }

  function deleteBook(req, res) {
    if (Object.keys(req.body).length !== 0) {
      return res.status(400).send('Bad post request schema');
    }
    return req.book.remove((err) => {
      if (err) {
        debug(err);
        return res.sendStatus(400);
      }
      return res.sendStatus(204);
    });
  }

  return {
    getAllBooks,
    searchBookById,
    getBookById,
    postBook,
    putBook,
    patchBook,
    deleteBook,
  };
}

module.exports = bookRouterController;
