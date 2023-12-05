const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images/');
    },

    filename: (req, file, cb) => {
      cb(null, Buffer.from(file.originalname).toString('utf8'));
    },
  }),
});

const imageUpload = (req, res, next) => {};

module.exports = upload;
