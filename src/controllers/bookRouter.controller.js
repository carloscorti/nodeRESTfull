const debug = require('debug')('app:bookRouter.controller');
const { mongoGet } = require('../services/mongoQuery.service')();

function bookRouterController() {
  function getAllBooks(req, res) {
    (async () => {
      const books = await mongoGet();
      debug('recived ok from service');
      res.json(books);
    })();
  }

  function getBookById(req, res) {
    (async () => {
      const { id } = req.params;
      const bookSelected = await mongoGet(id);
      debug('recived ok from service');
      res.json(bookSelected);
    })();
  }

  return {
    getAllBooks,
    getBookById,
  };
}

module.exports = bookRouterController;
