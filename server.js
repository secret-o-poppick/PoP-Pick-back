const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const cors = require('cors');

const { apiRouter } = require('./src/routers/index');
const { errorHandler } = require('./src/middleware/errorHandler');

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images');
    },

    filename: (req, file, cb) => {
      cb(
        null,
        Buffer.from(`${Date.now()}_${file.originalname}`).toString('utf8')
      );
    },
  }),
});

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('connected', () => {
  console.log('Successfully connected to MongoDB');
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/images', express.static('images'));
app.use(upload.array('file'));
app.use(cors());

app.use('/api', apiRouter);
app.use(errorHandler);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
