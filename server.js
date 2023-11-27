const express = require('express');
const app = express();
const cors = require('cors');

const { apiRouter } = require('./src/routers/index');
const { errorHandler } = require('./src/middleware/errorHandler');

require('dotenv').config();

app.use(express.json());
app.use(cors());

app.get('/', apiRouter);
app.use(errorHandler);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
