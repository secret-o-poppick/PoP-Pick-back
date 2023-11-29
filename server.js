const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

const { apiRouter } = require('./src/routers/index');
const { errorHandler } = require('./src/middleware/errorHandler');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('connected', () => {
  console.log('Successfully connected to MongoDB');
});

app.use(express.json());
app.use(cors());

app.use('/api', apiRouter);
app.use(errorHandler);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
