const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:mongoQuery.service');
const { url, dbName } = require('./conection.service');


function mongoQuery() {
  async function mongoGet(id = null) {
    const queryObject = {};
    if (id) {
      queryObject._id = new ObjectID(id);
    }
    let client;
    try {
      client = await MongoClient.connect(url, { useUnifiedTopology: true });
      debug('Server connected');

      const db = client.db(dbName);

      const col = db.collection('books');

      const books = await col.find(queryObject).toArray();

      return books;
    } catch (err) {
      debug(err.stack);
      return [];
    } finally {
      await client.close();
      debug('Connection closed');
    }
  }

  return {
    mongoGet,
  };
}

module.exports = mongoQuery;
