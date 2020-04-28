const express = require('express');
const debug = require('debug')('app');

const app = express();
const bookRouter = require('./src/routes/bookRouter')();

const port = process.env.PORT || 3000;

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my RESTFull Api');
});

app.listen(port, () => debug(`App listening at port ${port}`));
